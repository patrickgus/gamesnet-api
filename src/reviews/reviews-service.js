const xss = require("xss");

const ReviewsService = {
  getAllReviews(knex) {
    return knex.select("*").from("gamesnet_reviews");
  },
  insertReview(knex, newReview) {
    return knex
      .insert(newReview)
      .into("gamesnet_reviews")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("gamesnet_reviews")
      .select("*")
      .where("id", id)
      .first();
  },
  serializeReview(review) {
    return {
      id: review.id,
      title: xss(review.title),
      rating: review.rating,
      review: xss(review.review),
      date_posted: review.date_posted,
      game_id: review.game_id,
      user_id: review.user_id
    }
  }
};

module.exports = ReviewsService;
