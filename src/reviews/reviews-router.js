const path = require("path");
const express = require("express");
const ReviewsService = require("./reviews-service");
const { requireAuth } = require("../middleware/jwt-auth");

const reviewsRouter = express.Router();
const jsonParser = express.json();

reviewsRouter.route("/").post(requireAuth, jsonParser, (req, res, next) => {
  const { title, rating, review, game_id } = req.body;
  const newReview = { title, rating, review, game_id };

  for (const [key, value] of Object.entries(newReview))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      });

  newReview.user_id = req.user.id;

  ReviewsService.insertReview(req.app.get("db"), newReview)
    .then(review => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${review.id}`))
        .json(ReviewsService.serializeReview(review));
    })
    .catch(next);
});

module.exports = reviewsRouter;
