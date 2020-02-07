const path = require("path");
const express = require("express");
const xss = require("xss");
const GamesService = require("./games-service");

const gamesRouter = express.Router();
const jsonParser = express.json();

const serializeGame = game => ({
  id: game.id,
  title: xss(game.title),
  cover: xss(game.cover),
  avg_rating: game.avg_rating,
  description: xss(game.description),
  rated: xss(game.rated),
  platforms: xss(game.platforms),
  date_added: game.date_added,
  poster: game.poster
});

gamesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    GamesService.getAllGames(knexInstance)
      .then(games => {
        res.json(games.map(serializeGame));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      title,
      avg_rating,
      description,
      rated,
      platforms,
      poster
    } = req.body;
    const newGame = {
      title,
      avg_rating,
      description,
      rated,
      platforms
    };

    for (const [key, value] of Object.entries(newGame))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
    newGame.poster = poster;
    GamesService.insertGame(req.app.get("db"), newGame)
      .then(game => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${game.id}`))
          .json(serializeGame(game));
      })
      .catch(next);
  });

gamesRouter
  .route("/:game_id")
  .all((req, res, next) => {
    GamesService.getById(req.app.get("db"), req.params.game_id)
      .then(game => {
        if (!game) {
          return res.status(404).json({
            error: { message: `Game doesn't exist` }
          });
        }
        res.game = game;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeGame(res.game));
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

module.exports = gamesRouter;
