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
  }
};

module.exports = ReviewsService;
