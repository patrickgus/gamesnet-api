BEGIN;

TRUNCATE
  gamesnet_reviews,
  gamesnet_games,
  gamesnet_users
  RESTART IDENTITY CASCADE;

INSERT INTO gamesnet_users(fullname, username, password)
VALUES
  ('Test User', 'testuser', 'Test123!'),
  ('John Smith', 'smitty', 'Pa$sword1'),
  ('Geoff George', 'GG3', 'Hello!23');
  
INSERT INTO gamesnet_games(title, avg_rating, description, rated, platforms, poster_id)
VALUES
  ('God of War(2018)', 9.7, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Playstaion', 1),
  ('PUBG', 6.8, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'T', 'Playstaion, Xbox, PC, Mobile', 3),
  ('Halo 2', 8, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Xbox, Windows', 1),
  ('The Outer Worlds', 7.5, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet, odio vitae imperdiet finibus, purus nisi tincidunt lorem, feugiat bibendum mi mi sit amet urna. Donec a elementum nunc, sed dapibus augue. Duis volutpat at nisl eget varius. Nam vitae libero auctor, lacinia quam ac, fermentum dolor. Donec arcu neque, faucibus eu porta nec, laoreet sit amet eros.',
    'M', 'Playstaion, Xbox, PC', 2),
  ('Assassins Creed: Oddyssey', 9, 
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
  (2, 2, 'Kinda sucks sometimes', 6, 'review'),
  (5, 3, 'Awesome', 10, 'review'),
  (4, 1, 'Just like Fallout', 9, 'review');

COMMIT;
