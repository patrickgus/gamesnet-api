const path = require("path");
const express = require("express");
const GamesService = require("./games-service");
const { requireAuth } = require('../middleware/jwt-auth')

const gamesRouter = express.Router();
const jsonParser = express.json();

gamesRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    GamesService.getAllGames(knexInstance)
      .then(games => {
        res.json(games.map(GamesService.serializeGame));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      title,
      description,
      rated,
      platforms
    } = req.body;
    const newGame = {
      title,
      description,
      rated,
      platforms
    };

    for (const [key, value] of Object.entries(newGame))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    newGame.user_id = req.user.id;

    GamesService.insertGame(req.app.get("db"), newGame)
      .then(game => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${game.id}`))
          .json(GamesService.serializeGame(game));
      })
      .catch(next);
  });

gamesRouter
  .route("/:game_id")
  .all(requireAuth)
  .all(checkGameExists)
  .get((req, res, next) => {
    res.json(GamesService.serializeGame(res.game));
  })
  .delete((req, res, next) => {
    GamesService.deleteGame(req.app.get("db"), req.params.game_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, description, rated, platforms } = req.body;
    const gameToUpdate = { title, description, rated, platforms };

    const numberOfValues = Object.values(gameToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'description', 'rated', or 'platforms'`
        }
      });

    GamesService.updateGame(req.app.get("db"), req.params.game_id, gameToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

gamesRouter
  .route("/:game_id/reviews/")
  .all(requireAuth)
  .all(checkGameExists)
  .get((req, res, next) => {
    GamesService.getReviewsForGame(req.app.get("db"), req.params.game_id)
      .then(reviews => {
        res.json(reviews.map(GamesService.serializeReview));
      })
      .catch(next);
  });

async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.getById(
      req.app.get("db"),
      req.params.game_id
    );

    if (!game)
      return res.status(404).json({
        error: `Game doesn't exist`
      });

    res.game = game;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = gamesRouter;
