const path = require("path");
const express = require("express");
const ReviewsService = require("./reviews-service");

const reviewsRouter = express.Router();
const jsonParser = express.json();

reviewsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ReviewsService.getAllReviews(knexInstance)
      .then(reviews => {
        res.json(reviews.map(serializeReview));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, rating, review, game_id, user_id, date_posted } = req.body;
    const newReview = { title, rating, review, game_id, user_id };

    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    newReview.date_posted = date_posted;

    ReviewsService.insertReview(req.app.get("db"), newReview)
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(serializeReview(review));
      })
      .catch(next);
  });

module.exports = reviewsRouter;