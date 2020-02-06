function makeUsersArray() {
  return [
    {
      id: 1,
      date_created: "2029-01-22T16:28:32.615Z",
      fullname: "Sam Gamgee",
      username: "sam.gamgee",
      password: "secret"
    },
    {
      id: 2,
      date_created: "2100-05-22T16:28:32.615Z",
      fullname: "Peregrin Took",
      username: "peregrin.took",
      password: "secret"
    }
  ];
}

module.exports = {
  makeUsersArray
};
