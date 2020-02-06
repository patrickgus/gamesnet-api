const GamesService = {
  getAllGames(knex) {
    return knex.select("*").from("gamesnet_games");
  },
  insertGame(knex, newGame) {
    return knex
      .insert(newGame)
      .into("gamesnet_games")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("gamesnet_games")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteGame(knex, id) {
    return knex("gamesnet_games")
      .where({ id })
      .delete();
  },
  updateGame(knex, id, newGameFields) {
    return knex("gamesnet_games")
      .where({ id })
      .update(newGameFields);
  }
};

module.exports = GamesService;
