const xss = require("xss");
const Treeize = require("treeize");

const GamesService = {
  getAllGames(db) {
    return db
      .from("gamesnet_games AS gam")
      .select(
        "gam.id",
        "gam.title",
        "gam.description",
        "gam.rated",
        "gam.platforms",
        "gam.date_added",
        ...userFields,
        db.raw(`count(DISTINCT rev) AS number_of_reviews`),
        db.raw(`ROUND(AVG(rev.rating), 1) AS avg_rating`)
      )
      .leftJoin("gamesnet_reviews AS rev", "gam.id", "rev.game_id")
      .leftJoin("gamesnet_users AS usr", "gam.user_id", "usr.id")
      .groupBy("gam.id", "usr.id");
  },

  insertGame(db, newGame) {
    return db
      .insert(newGame)
      .into("gamesnet_games")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  getById(db, id) {
    return GamesService.getAllGames(db)
      .where("gam.id", id)
      .first();
  },

  getReviewsForGame(db, game_id) {
    return db
      .from("gamesnet_reviews AS rev")
      .select(
        "rev.id",
        "rev.title",
        "rev.rating",
        "rev.review",
        "rev.date_posted",
        ...userFields
      )
      .where("rev.game_id", game_id)
      .leftJoin("gamesnet_users AS usr", "rev.user_id", "usr.id")
      .groupBy("rev.id", "usr.id");
  },

  serializeGames(games) {
    return games.map(this.serializeGame);
  },

  serializeGame(game) {
    const gameTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const gameData = gameTree.grow([game]).getData()[0];

    return {
      id: gameData.id,
      title: xss(gameData.title),
      description: xss(gameData.description),
      rated: xss(gameData.rated),
      platforms: xss(gameData.platforms),
      date_added: gameData.date_added,
      user: gameData.user || {},
      number_of_reviews: Number(gameData.number_of_reviews) || 0,
      avg_rating: Math.round(gameData.avg_rating) || 0
    };
  },

  serializeReviews(reviews) {
    return reviews.map(this.serializeReview);
  },

  serializeReview(review) {
    const reviewTree = new Treeize();

    const reviewData = reviewTree.grow([review]).getData()[0];

    return {
      id: reviewData.id,
      game_id: reviewData.game_id,
      title: xss(reviewData.title),
      rating: reviewData.rating,
      review: xss(reviewData.review),
      date_posted: reviewData.date_posted,
      user: reviewData.user || {}
    };
  }
};

const userFields = [
  "usr.id AS user:id",
  "usr.username AS user:username",
  "usr.fullname AS user:fullname",
  "usr.date_joined AS user:date_joined"
];

module.exports = GamesService;
