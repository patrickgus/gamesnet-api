const xss = require("xss");

const GamesService = {
  getAllGames(knex) {
    return knex.select("*").from("gamesnet_games");
  },
  insertGame(knex, newGame) {
    return knex
      .insert(newGame)
      .into("gamesnet_games")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("gamesnet_games")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteGame(knex, id) {
    return knex("gamesnet_games")
      .where({ id })
      .delete();
  },
  updateGame(knex, id, newGameFields) {
    return knex("gamesnet_games")
      .where({ id })
      .update(newGameFields);
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
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.username,
                  usr.fullname,
                  usr.date_joined
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where("rev.game_id", game_id)
      .leftJoin("gamesnet_users AS usr", "rev.user_id", "usr.id")
      .groupBy("rev.id", "usr.id");
  },

  serializeGame(game) {
    return {
      id: game.id,
      title: xss(game.title),
      cover: xss(game.cover),
      avg_rating: game.avg_rating,
      description: xss(game.description),
      rated: xss(game.rated),
      platforms: xss(game.platforms),
      date_added: new Date(game.date_added),
      poster_id: game.poster_id
    };
  },

  serializeReview(review) {
    const { user } = review;
    return {
      id: review.id,
      game_id: review.game_id,
      title: xss(review.title),
      rating: review.rating,
      review: xss(review.review),
      date_posted: new Date(review.date_posted),
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        date_joined: new Date(user.date_joined)
      }
    };
  }
};

module.exports = GamesService;
