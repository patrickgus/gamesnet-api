const bcrypt = require("bcryptjs");
const xss = require("xss");

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  getAllUsers(knex) {
    return knex.select("*").from("gamesnet_users");
  },

  hasUserWithUserName(db, username) {
    return db("gamesnet_users")
      .where({ username })
      .first()
      .then(user => !!user);
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("gamesnet_users")
      .returning("*")
      .then(([user]) => user);
  },

  validatePassword(password) {
    if (password.length < 8) {
      return "Password be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain one upper case, lower case, number and special character";
    }
    return null;
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  getById(knex, id) {
    return knex
      .from("gamesnet_users")
      .select("*")
      .where("id", id)
      .first();
  },

  deleteUser(knex, id) {
    return knex("gamesnet_users")
      .where({ id })
      .delete();
  },

  updateUser(knex, id, newUserFields) {
    return knex("gamesnet_users")
      .where({ id })
      .update(newUserFields);
  },

  serializeUser(user) {
    return {
      id: user.id,
      fullname: xss(user.fullname),
      username: xss(user.username),
      date_joined: user.date_joined
    }
  }
};

module.exports = UsersService;
