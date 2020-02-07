function makeGamesArray() {
  return [
    {
      id: 1,
      title: "First test game",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/5122wZuQ%2BhL.jpg",
      avg_rating: 6,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.",
      rated: "M",
      platforms: "Playstaion",
      date_added: "2029-01-22T16:28:32.615Z",
      poster_id: 2
    },
    {
      id: 2,
      title: "Second test game",
      cover:
        "https://haste.net/wp-content/uploads/2017/11/Haste-PUBG-Cover.jpg",
      avg_rating: 8,
      description:
        "Sed pharetra, ante vel aliquet viverra, augue nunc malesuada dui, vel sollicitudin enim sem at urna. Integer pharetra sodales dolor, id accumsan purus aliquam sed. Donec at magna convallis, varius turpis in, elementum eros. Aliquam erat volutpat. Ut at leo eu ligula fermentum fringilla malesuada ut nisl.",
      rated: "T",
      platforms: "Playstation, Xbox, PC, Mobile",
      date_added: "2029-01-22T16:28:32.615Z",
      poster_id: 1
    },
    {
      id: 3,
      title: "Third test game",
      avg_rating: 4,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Halo2-cover.png/220px-Halo2-cover.png",
      description:
        "Mauris erat justo, facilisis eget lacus convallis, feugiat luctus massa. Nullam molestie ullamcorper nisl sed posuere. Aliquam erat volutpat. Morbi sed suscipit neque, eu fermentum dolor. Vivamus luctus, eros eu finibus auctor, arcu erat pretium sem, ut tempor mi quam vitae dolor. Mauris feugiat mi in imperdiet commodo.",
      rated: "M",
      platforms: "Xbox, Windows",
      date_added: "2029-01-22T16:28:32.615Z",
      poster_id: 2
    },
    {
      id: 4,
      title: "Fourth test game",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Outer_Worlds_cover_art.png/220px-The_Outer_Worlds_cover_art.png",
      avg_rating: 3,
      description:
        "In ut scelerisque leo, non ultricies velit. Nam ullamcorper tortor lorem, eu tincidunt turpis cursus porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer condimentum tempus ligula eget pretium. Duis id diam eu est egestas efficitur non consectetur ex.",
      rated: "E",
      platforms: "Playstation, Xbox, PC",
      date_added: "1919-12-22T16:28:32.615Z",
      poster_id: 2
    },
    {
      id: 5,
      title: "Fifth test game",
      cover:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/30dd9067302871.5b34f741efc0b.jpg",
      avg_rating: 9,
      description:
        "Suspendisse viverra sodales metus tincidunt interdum. Phasellus nec tellus euismod, mollis turpis vel, scelerisque odio. Integer ante purus, lobortis a tincidunt sit amet, semper lobortis magna. Maecenas malesuada volutpat luctus. Praesent convallis metus id leo ornare porttitor non quis dui. Nunc in risus dignissim, iaculis lacus sed, cursus diam.",
      rated: "T",
      platforms: "Playstation, Xbox, PC, Switch, Stadia",
      date_added: "1919-12-22T16:28:32.615Z",
      poster_id: 1
    }
  ];
}

function makeMaliciousGame() {
  const maliciousGame = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    cover:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/30dd9067302871.5b34f741efc0b.jpg",
    avg_rating: 2,
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    rated: "U",
    platforms: "Xbox",
    date_added: new Date().toISOString()
  };
  const expectedGame = {
    ...maliciousGame,
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  };
  return {
    maliciousGame,
    expectedGame
  };
}

module.exports = { makeGamesArray, makeMaliciousGame };
