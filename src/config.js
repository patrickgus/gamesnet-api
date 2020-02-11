module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://gamesnet-app.now.sh",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgres://qcwhksnjaeskst:0eafe89c6a29d3c6f8a0140a45ba46a9ff6a09ae41a627c2258cfa771b318c4d@ec2-52-203-160-194.compute-1.amazonaws.com:5432/d1si5dvtjj04tq",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://patrick_gus@localhost/gamesnet_test",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "3h"
};
