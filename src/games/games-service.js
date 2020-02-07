const GamesService = {
  getAllGames(knex) {
    return knex.select("*").from("gamesnet_games");
  }
};

module.exports = GamesService;
