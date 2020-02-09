const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Games Endpoints", function() {
  let db;

  const { testUsers, testGames, testReviews } = helpers.makeGamesFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe.only(`GET /api/games`, () => {
    context(`Given no games`, () => {
      it.only(`responds with 200 and an empty list`, () => {
        // console.log(testUsers[0]);
        console.log(helpers.makeAuthHeader(testUsers[0]));
        return supertest(app)
          .get("/api/games")
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context("Given there are games in the database", () => {
      beforeEach("insert games", () =>
        helpers.seedGamesTables(db, testUsers, testGames, testReviews)
      );

      it("responds with 200 and all of the games", () => {
        const expectedGames = testGames.map(game =>
          helpers.makeExpectedGame(testUsers, game)
        );
        return supertest(app)
          .get("/api/games")
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedGames);
      });
    });

    context(`Given an XSS attack game`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const { maliciousGame, expectedGame } = helpers.makeMaliciousGame(
        testUser
      );

      beforeEach("insert malicious game", () => {
        return helpers.seedMaliciousGame(db, testUser, maliciousGame);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/games`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedGame.title);
            expect(res.body[0].description).to.eql(expectedGame.description);
          });
      });
    });
  });

  describe(`GET /api/games/:game_id`, () => {
    context(`Given no games`, () => {
      it(`responds with 404`, () => {
        const gameId = 123456;
        return supertest(app)
          .get(`/api/games/${gameId}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Game doesn't exist` });
      });
    });

    context("Given there are games in the database", () => {
      beforeEach("insert games", () =>
        helpers.seedGamesTables(db, testUsers, testGames, testReviews)
      );

      it("responds with 200 and the specified game", () => {
        const gameId = 2;
        const expectedGame = helpers.makeExpectedGame(
          testUsers,
          testGames[gameId - 1]
        );

        return supertest(app)
          .get(`/api/games/${gameId}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedGame);
      });
    });

    context(`Given an XSS attack game`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const { maliciousGame, expectedGame } = helpers.makeMaliciousGame(
        testUser
      );

      beforeEach("insert malicious game", () => {
        return helpers.seedMaliciousGame(db, testUser, maliciousGame);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/games/${maliciousGame.id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedGame.title);
            expect(res.body.description).to.eql(expectedGame.description);
          });
      });
    });
  });

  describe(`GET /api/games/:game_id/reviews`, () => {
    context(`Given no games`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));

      it(`responds with 404`, () => {
        const gameId = 123456;
        return supertest(app)
          .get(`/api/games/${gameId}/reviews`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Game doesn't exist` });
      });
    });

    context("Given there are reviews for game in the database", () => {
      beforeEach("insert games", () =>
        helpers.seedGamesTables(db, testUsers, testGames, testReviews)
      );

      it("responds with 200 and the specified reviews", () => {
        const gameId = 1;
        const expectedReviews = helpers.makeExpectedGameReviews(
          testUsers,
          gameId,
          testReviews
        );

        return supertest(app)
          .get(`/api/games/${gameId}/reviews`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedReviews);
      });
    });
  });

  describe(`POST /api/games`, () => {
    it(`creates an game, responding with 201 and the new game`, function() {
      this.retries(3);
      const newGame = {
        title: "Test game",
        avg_rating: 10,
        description: "A game of tests",
        rated: "E",
        platforms: "PC"
      };
      return supertest(app)
        .post("/api/games")
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(newGame)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newGame.title);
          expect(res.body.avg_rating).to.eql(newGame.avg_rating);
          expect(res.body.description).to.eql(newGame.description);
          expect(res.body.rated).to.eql(newGame.rated);
          expect(res.body.platforms).to.eql(newGame.platforms);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/api/games/${res.body.id}`);
          const expected = new Date().toLocaleString();
          const actual = new Date(res.body.date_added).toLocaleString();
          expect(actual).to.eql(expected);
        })
        .then(postRes =>
          supertest(app)
            .get(`/api/games/${postRes.body.id}`)
            .expect(postRes.body)
        );
    });

    const requiredFields = ["title", "description", "rated", "platforms"];

    requiredFields.forEach(field => {
      const newGame = {
        title: "Test game",
        description: "A game of tests",
        rated: "E",
        platforms: "PC"
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newGame[field];

        return supertest(app)
          .post("/api/games")
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .send(newGame)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          });
      });
    });

    context(`Given an XSS attack game`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const { maliciousGame, expectedGame } = helpers.makeMaliciousGame(
        testUser
      );

      beforeEach("insert malicious game", () => {
        return helpers.seedMaliciousGame(db, testUser, maliciousGame);
      });

      it("removes XSS attack content from response", () => {
        return supertest(app)
          .post(`/api/games`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .send(maliciousGame)
          .expect(201)
          .expect(res => {
            expect(res.body.title).to.eql(expectedGame.title);
            expect(res.body.description).to.eql(expectedGame.description);
          });
      });
    });
  });
});
