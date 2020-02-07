require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const gamesRouter = require("./games/games-router");
const usersRouter = require("./users/users-router");
const reviewsRouter = require("./reviews/reviews-router");
const errorHandler = require("./error-handler");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(
  morgan(morganOption, {
    skip: () => NODE_ENV === "test"
  })
);
app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN }));

app.use("/api/games", gamesRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);

app.use(errorHandler);

module.exports = app;
