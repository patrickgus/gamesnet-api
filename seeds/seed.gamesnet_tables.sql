BEGIN;

TRUNCATE
  gamesnet_reviews,
  gamesnet_games,
  gamesnet_users
  RESTART IDENTITY CASCADE;

INSERT INTO gamesnet_users(fullname, username, password)
VALUES
  ('Test User', 'testuser', '$2a$12$zkbanq.gL/jqCT5vpDBZKOllpMAHYZVxZp8SsyndVNdJ1tZryHNsO'),
  ('John Smith', 'smitty', '$2a$12$68B48OpNd/Mow.7NYBz8QOgZANMXEHU95yd9hAdTqxGFIK9Y4wVPi'),
  ('Geoff George', 'GG3', '$2a$12$U71BqKYwRHbcGr/rQjkYDOjunaEVhtJVEJZkXiF4o1yfJVXvOl6A6');
  
INSERT INTO gamesnet_games(title, cover, description, rated, platforms, user_id)
VALUES
  ('God of War(2018)', 'https://images-na.ssl-images-amazon.com/images/I/5122wZuQ%2BhL.jpg',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Playstaion', 1),
  ('PUBG', 'https://i.pinimg.com/474x/cc/f5/16/ccf516ec57b13c340d90f2473dd23e08.jpg',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'T', 'Playstaion, Xbox, PC, Mobile', 3),
  ('Halo 2', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Halo2-cover.png/220px-Halo2-cover.png',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Xbox, Windows', 1),
  ('The Outer Worlds', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Outer_Worlds_cover_art.png/220px-The_Outer_Worlds_cover_art.png',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Playstaion, Xbox, PC', 2),
  ('Assassins Creed: Oddyssey', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/30dd9067302871.5b34f741efc0b.jpg',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Playstaion, Xbox, PC, Switch, Stadia', 3);

INSERT INTO gamesnet_reviews(game_id, user_id, title, rating, review)
VALUES
  (1, 1, 'The greatest game of all time', 10, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum lorem malesuada, posuere felis sed, ultrices orci. Phasellus varius neque eget lobortis mollis. Cras non venenatis nibh. Maecenas in nulla ut tellus dictum mollis. Maecenas libero velit, accumsan et ultrices vel, dapibus venenatis nibh. Sed nisi tellus, ullamcorper non neque eu, pharetra mattis risus. Sed metus ipsum, dignissim nec risus eget, pellentesque tincidunt enim. Quisque dui urna, pellentesque eu odio eget, imperdiet rutrum magna.'),
  (1, 2, 'My favorite game', 9, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum lorem malesuada, posuere felis sed, ultrices orci. Phasellus varius neque eget lobortis mollis. Cras non venenatis nibh. Maecenas in nulla ut tellus dictum mollis. Maecenas libero velit, accumsan et ultrices vel, dapibus venenatis nibh. Sed nisi tellus, ullamcorper non neque eu, pharetra mattis risus. Sed metus ipsum, dignissim nec risus eget, pellentesque tincidunt enim. Quisque dui urna, pellentesque eu odio eget, imperdiet rutrum magna.'),
  (1, 3, 'Simply, the best', 10, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum lorem malesuada, posuere felis sed, ultrices orci. Phasellus varius neque eget lobortis mollis. Cras non venenatis nibh. Maecenas in nulla ut tellus dictum mollis. Maecenas libero velit, accumsan et ultrices vel, dapibus venenatis nibh. Sed nisi tellus, ullamcorper non neque eu, pharetra mattis risus. Sed metus ipsum, dignissim nec risus eget, pellentesque tincidunt enim. Quisque dui urna, pellentesque eu odio eget, imperdiet rutrum magna.'),
  (2, 2, 'Not great but I love it!', 7, 'review'),
  (4, 1, 'Cool game', 8, 'review'),
  (3, 3, 'Love it', 9, 'review'),
  (3, 1, 'All time classic', 7, 'review'),
  (2, 3, 'Kinda sucks sometimes', 6, 'review'),
  (5, 3, 'Awesome', 10, 'review'),
  (4, 2, 'Just like Fallout', 9, 'review');

COMMIT;
