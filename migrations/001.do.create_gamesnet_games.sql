CREATE TABLE gamesnet_games (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  cover TEXT,
  avg_rating INTEGER NOT NULL,
  description TEXT NOT NULL,
  rated TEXT NOT NULL,
  platforms TEXT NOT NULL,
  date_added TIMESTAMP DEFAULT now() NOT NULL
);