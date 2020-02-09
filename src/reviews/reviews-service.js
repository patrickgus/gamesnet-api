const xss = require("xss");

const ReviewsService = {
  getById(db, id) {
    return db
      .from("gamesnet_reviews AS rev")
      .select(
        "rev.id",
        "rev.title",
        "rev.rating",
        "rev.review",
        "rev.date_posted",
        "rev.game_id",
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
                usr.id,
                usr.username,
                usr.fullname,
                usr.date_joined
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin("gamesnet_users AS usr", "rev.user_id", "usr.id")
      .where("rev.id", id)
      .first();
  },

  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into("gamesnet_reviews")
      .returning("*")
      .then(([review]) => review)
      .then(review => ReviewsService.getById(db, review.id));
  },

  serializeReview(review) {
    return {
      id: review.id,
      title: xss(review.title),
      rating: review.rating,
      review: xss(review.review),
      date_posted: review.date_posted,
      game_id: review.game_id,
      user: review.user || {}
    };
  }
};

module.exports = ReviewsService;
