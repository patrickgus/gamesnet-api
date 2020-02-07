const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      date_joined: new Date("2029-01-22T16:28:32.615Z"),
      fullname: "Test User 1",
      username: "test-user-1",
      password: "secret"
    },
    {
      id: 2,
      date_joined: new Date("2100-05-22T16:28:32.615Z"),
      fullname: "Test user 2",
      username: "test-user-2",
      password: "secret"
    },
    {
      id: 3,
      date_joined: new Date("2029-01-22T16:28:32.615Z"),
      fullname: "Test user 3",
      username: "test-user-3",
      password: "password"
    }
  ];
}

function makeGamesArray(users) {
  return [
    {
      id: 1,
      title: "First test game",
      avg_rating: 6,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.",
      rated: "M",
      platforms: "Playstaion",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      poster_id: users[1].id
    },
    {
      id: 2,
      title: "Second test game",
      avg_rating: 8,
      description:
        "Sed pharetra, ante vel aliquet viverra, augue nunc malesuada dui, vel sollicitudin enim sem at urna. Integer pharetra sodales dolor, id accumsan purus aliquam sed. Donec at magna convallis, varius turpis in, elementum eros. Aliquam erat volutpat. Ut at leo eu ligula fermentum fringilla malesuada ut nisl.",
      rated: "T",
      platforms: "Playstation, Xbox, PC, Mobile",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      poster_id: users[0].id
    },
    {
      id: 3,
      title: "Third test game",
      avg_rating: 4,
      description:
        "Mauris erat justo, facilisis eget lacus convallis, feugiat luctus massa. Nullam molestie ullamcorper nisl sed posuere. Aliquam erat volutpat. Morbi sed suscipit neque, eu fermentum dolor. Vivamus luctus, eros eu finibus auctor, arcu erat pretium sem, ut tempor mi quam vitae dolor. Mauris feugiat mi in imperdiet commodo.",
      rated: "M",
      platforms: "Xbox, Windows",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      poster_id: users[2].id
    },
    {
      id: 4,
      title: "Fourth test game",
      avg_rating: 3,
      description:
        "In ut scelerisque leo, non ultricies velit. Nam ullamcorper tortor lorem, eu tincidunt turpis cursus porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer condimentum tempus ligula eget pretium. Duis id diam eu est egestas efficitur non consectetur ex.",
      rated: "E",
      platforms: "Playstation, Xbox, PC",
      date_added: new Date("1919-12-22T16:28:32.615Z"),
      poster_id: users[1].id
    },
    {
      id: 5,
      title: "Fifth test game",
      avg_rating: 9,
      description:
        "Suspendisse viverra sodales metus tincidunt interdum. Phasellus nec tellus euismod, mollis turpis vel, scelerisque odio. Integer ante purus, lobortis a tincidunt sit amet, semper lobortis magna. Maecenas malesuada volutpat luctus. Praesent convallis metus id leo ornare porttitor non quis dui. Nunc in risus dignissim, iaculis lacus sed, cursus diam.",
      rated: "T",
      platforms: "Playstation, Xbox, PC, Switch, Stadia",
      date_added: new Date("1919-12-22T16:28:32.615Z"),
      poster_id: users[0].id
    }
  ];
}

function makeReviewsArray(users, games) {
  return [
    {
      id: 1,
      title: "First test review!",
      rating: 9,
      review: "This is the first test review",
      game_id: games[0].id,
      user_id: users[0].id,
      date_posted: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      id: 2,
      title: "Second test review!",
      rating: 8,
      review: "This is the second test review",
      game_id: games[1].id,
      user_id: users[1].id,
      date_posted: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      id: 3,
      title: "Third test review!",
      rating: 7,
      review: "This is the third test review",
      game_id: games[0].id,
      user_id: users[2].id,
      date_posted: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      id: 4,
      title: "Fourth test review!",
      rating: 6,
      review: "This is the fourth test review",
      game_id: games[2].id,
      user_id: users[0].id,
      date_posted: new Date("2029-01-22T16:28:32.615Z")
    }
  ];
}

function makeExpectedGame(users, game) {
  const poster = users.find(user => user.id === game.poster_id);

  return {
    id: game.id,
    title: game.title,
    avg_rating: game.avg_rating,
    description: game.description,
    rated: game.rated,
    platforms: game.platforms,
    date_added: game.date_added.toISOString(),
    poster_id: game.poster_id
  };
}

function makeExpectedGameReviews(users, gameId, reviews) {
  const expectedReviews = reviews.filter(review => review.game_id === gameId);

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id);
    return {
      id: review.id,
      title: review.title,
      rating: review.rating,
      review: review.review,
      date_posted: review.date_posted.toISOString(),
      user: {
        id: reviewUser.id,
        username: reviewUser.username,
        fullname: reviewUser.fullname,
        date_joined: reviewUser.date_joined.toISOString()
      }
    };
  });
}

function makeMaliciousGame(user) {
  const maliciousGame = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    avg_rating: 2,
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    rated: "U",
    platforms: "Xbox",
    date_added: new Date(),
    poster_id: user.id
  };
  const expectedGame = {
    ...makeExpectedGame([user], maliciousGame),
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  };
  return {
    maliciousGame,
    expectedGame
  };
}

function makeGamesFixtures() {
  const testUsers = makeUsersArray();
  const testGames = makeGamesArray(testUsers);
  const testReviews = makeReviewsArray(testUsers, testGames);
  return { testUsers, testGames, testReviews };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
        gamesnet_games,
        gamesnet_users,
        gamesnet_reviews
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE gamesnet_games_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE gamesnet_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE gamesnet_reviews_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('gamesnet_games_id_seq', 0)`),
          trx.raw(`SELECT setval('gamesnet_users_id_seq', 0)`),
          trx.raw(`SELECT setval('gamesnet_reviews_id_seq', 0)`)
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into("gamesnet_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('gamesnet_users_id_seq', ?)`, [
        users[users.length - 1].id
      ])
    );
}

function seedGamesTables(db, users, games, reviews = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await trx.into("gamesnet_games").insert(games);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('gamesnet_games_id_seq', ?)`, [
      games[games.length - 1].id
    ]);
    // only insert reviews if there are some, also update the sequence counter
    if (reviews.length) {
      await trx.into("gamesnet_reviews").insert(reviews);
      await trx.raw(`SELECT setval('gamesnet_reviews_id_seq', ?)`, [
        reviews[reviews.length - 1].id
      ]);
    }
  });
}

function seedMaliciousGame(db, user, game) {
  return seedUsers(db, [user]).then(() =>
    db.into("gamesnet_games").insert([game])
  );
}

// function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
//   const token = jwt.sign({ user_id: user.id }, secret, {
//     subject: user.user_name,
//     algorithm: 'HS256',
//   })
//   return `Bearer ${token}`
// }

module.exports = {
  makeUsersArray,
  makeGamesArray,
  makeExpectedGame,
  makeExpectedGameReviews,
  makeMaliciousGame,
  makeReviewsArray,
  makeGamesFixtures,
  cleanTables,
  seedUsers,
  seedGamesTables,
  seedMaliciousGame
};
