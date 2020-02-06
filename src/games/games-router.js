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
  date_added: game.date_published
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
    const { title, avg_rating, description, rated, platforms } = req.body;
    const newGame = { title, avg_rating, description, rated, platforms };

    for (const [key, value] of Object.entries(newGame))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
    GamesService.insertGame(req.app.get("db"), newGame)
      .then(game => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${game.id}`))
          .json(serializeGame(game));
      })
      .catch(next);
  });

gamesRouter.route("/:game_id").get((req, res, next) => {
  GamesService.getById(req.app.get("db"), req.params.game_id)
    .then(game => {
      if (!game) {
        return res.status(404).json({
          error: { message: `Game doesn't exist` }
        });
      }
      res.json(serializeGame(game));
      next();
    })
    .catch(next);
});

module.exports = gamesRouter;
