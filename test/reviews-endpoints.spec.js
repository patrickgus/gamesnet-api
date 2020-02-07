const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Reviews Endpoints", function() {
  let db;

  const { testGames, testUsers } = helpers.makeGamesFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`POST /api/reviews`, () => {
    beforeEach("insert games", () =>
      helpers.seedGamesTables(db, testUsers, testGames)
    );

    it(`creates an review, responding with 201 and the new review`, function() {
      this.retries(3);
      const testGame = testGames[0];
      const testUser = testUsers[0];
      const newReview = {
        title: "Test new review",
        rating: 8,
        review: "New review for test",
        game_id: testGame.id,
        user_id: testUser.id
      };
      return supertest(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property("id");
          expect(res.body.title).to.eql(newReview.title);
          expect(res.body.rating).to.eql(newReview.rating);
          expect(res.body.review).to.eql(newReview.review);
          expect(res.body.game_id).to.eql(newReview.game_id);
          expect(res.body.user_id).to.eql(newReview.user_id);
          expect(res.headers.location).to.eql(`/api/reviews/${res.body.id}`);
          const expectedDate = new Date().toLocaleString("en", {
            timeZone: "UTC"
          });
          const actualDate = new Date(res.body.date_posted).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect(res =>
          db
            .from("gamesnet_reviews")
            .select("*")
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.title).to.eql(newReview.title);
              expect(row.rating).to.eql(newReview.rating);
              expect(row.review).to.eql(newReview.review);
              expect(row.game_id).to.eql(newReview.game_id);
              expect(row.user_id).to.eql(testUser.id);
              const expectedDate = new Date().toLocaleString("en", {
                timeZone: "UTC"
              });
              const actualDate = new Date(row.date_posted).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });

    const requiredFields = ["title", "rating", "review", "game_id"];

    requiredFields.forEach(field => {
      const testGame = testGames[0];
      const testUser = testUsers[0];
      const newReview = {
        title: "Test new review",
        rating: 8,
        review: "New review for test",
        game_id: testGame.id
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field];

        return supertest(app)
          .post("/api/reviews")
          .send(newReview)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          });
      });
    });
  });
});
