const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./users.fixtures");
const { makeGamesArray, makeMaliciousGame } = require("./games.fixtures");

describe("Games Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE gamesnet_games RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE gamesnet_games RESTART IDENTITY CASCADE")
  );

  describe(`GET /api/games`, () => {
    context(`Given no games`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/games")
          .expect(200, []);
      });
    });

    context("Given there are games in the database", () => {
      const testGames = makeGamesArray();

      beforeEach("insert games", () => {
        return db.into("gamesnet_games").insert(testGames);
      });

      it("responds with 200 and all of the games", () => {
        return supertest(app)
          .get("/api/games")
          .expect(200, testGames);
      });
    });

    context(`Given an XSS attack game`, () => {
      const testUsers = makeUsersArray();
      const { maliciousGame, expectedGame } = makeMaliciousGame();

      beforeEach("insert malicious game", () => {
        return db
          .into("gamesnet_users")
          .insert(testUsers)
          .then(() => {
            return db.into("gamesnet_games").insert([maliciousGame]);
          });
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/games`)
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
          .expect(404, { error: { message: `Game doesn't exist` } });
      });
    });

    context("Given there are games in the database", () => {
      const testUsers = makeUsersArray();
      const testGames = makeGamesArray();

      beforeEach("insert games", () => {
        return db
          .into("gamesnet_users")
          .insert(testUsers)
          .then(() => {
            return db.into("gamesnet_games").insert(testGames);
          });
      });

      it("responds with 200 and the specified game", () => {
        const gameId = 2;
        const expectedGame = testGames[gameId - 1];
        return supertest(app)
          .get(`/api/games/${gameId}`)
          .expect(200, expectedGame);
      });
    });

    context(`Given an XSS attack game`, () => {
      const testUsers = makeUsersArray();
      const { maliciousGame, expectedGame } = makeMaliciousGame();

      beforeEach("insert malicious game", () => {
        return db
          .into("gamesnet_users")
          .insert(testUsers)
          .then(() => {
            return db.into("gamesnet_games").insert([maliciousGame]);
          });
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/games/${maliciousGame.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedGame.title);
            expect(res.body.description).to.eql(expectedGame.description);
          });
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

    const requiredFields = ["title", "avg_rating", "description", "rated", "platforms"];

    requiredFields.forEach(field => {
      const newGame = {
        title: "Test game",
        avg_rating: 10,
        description: "A game of tests",
        rated: "E",
        platforms: "PC"
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newGame[field];

        return supertest(app)
          .post("/api/games")
          .send(newGame)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          });
      });
    });

    it("removes XSS attack content from response", () => {
      const { maliciousGame, expectedGame } = makeMaliciousGame();
      return supertest(app)
        .post(`/api/games`)
        .send(maliciousGame)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(expectedGame.title);
          expect(res.body.description).to.eql(expectedGame.description);
        });
    });
  });
});
