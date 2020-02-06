require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const xss = require("xss");
const { NODE_ENV } = require("./config");
const GamesService = require("./games/games-service");
// const gamesRouter = require("./games/games-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

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

app.get("/api/games", (req, res, next) => {
  GamesService.getAllGames(req.app.get("db"))
    .then(games => {
      res.json(games.map(serializeGame));
    })
    .catch(next);
});

app.get("/api/games/:game_id", (req, res, next) => {
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

app.post("/api/games", jsonParser, (req, res, next) => {
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

// app.get("/api/games", gamesRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
