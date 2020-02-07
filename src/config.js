module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://gamesnet-app.now.sh/",
  DB_URL: process.env.DB_URL || "postgresql://patrick_gus@localhost/gamesnet",
  TEST_DB_URL: process.env.TEST_DB_URL || "postgresql://patrick_gus@localhost/gamesnet_test"
};
