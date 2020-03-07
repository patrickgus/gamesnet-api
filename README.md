# GamesNet

[Live Page](https://gamesnet-app.now.sh/)

[Front End Repo](https://github.com/patrickgus/gamesnet-app)

## Summary

GamesNet is an app where users can rate and review video games. Users also add the video games that they want to get reviewed. This gives people a chance to get an opinion of a video game before they decide to buy it. As games are being rated, the game list will update the average rating for each game. The list of games can be sorted alphabetically or by rating from highest to lowest.

## Built with:

  - React.js
  - Node.js
  - Express.js
  - PostgreSQL
  - REST API
  - CSS
  - HTML
  - jQuery
  - Mocha
  - Chai

## Screenshots of the user's journey

To demo the app you can use these test user credentials:
  - username: testuser
  - password: Test123!

Or you could make your own user profile if you like. You would just need to supply your full name, a username, and a protected password.
_We do not share any personal information with anyone else._

### Landing Page:
![GamesNet-LandingPage](https://user-images.githubusercontent.com/53308172/74491081-780aac80-4e7f-11ea-90c2-47e03112d0bd.png)
If you click on the 'Register' link in the top, right-hand corner of the page, you will be brought to the Registration Page.
### Registration Page:
![GamesNet-RegistrationPage](https://user-images.githubusercontent.com/53308172/74491093-7e008d80-4e7f-11ea-9d87-f98b2c1b68a2.png)
If you successfully log in with a correct username and password, you will be brought to the Game List page.
### Game List Page:
![GamesNet-GameListPage](https://user-images.githubusercontent.com/53308172/74491100-85c03200-4e7f-11ea-93b3-573479e8a19c.png)
Clicking on 'Add Game' will let you add a new game to the list to be reviewed.
### Add Game Page:
![GamesNet-AddGamePage](https://user-images.githubusercontent.com/53308172/74491108-8b1d7c80-4e7f-11ea-95e9-c4eba94bc967.png)
Clicking on the title or cover image of a game in the list will bring you to the Game Review Page
### Game Review Page:
![GamesNet-GameReviewPage](https://user-images.githubusercontent.com/53308172/74491112-8eb10380-4e7f-11ea-9bd3-45a061fab606.png)
If you want to add a review, click on the 'Add Review' link and it will take you to the Add Review page
### Add Review Page:
![GamesNet-AddReviewPage](https://user-images.githubusercontent.com/53308172/74491114-907ac700-4e7f-11ea-8751-0b66d030703e.png)GamesNet-AddReviewPage](https://user-images.githubusercontent.com/53308172/74409765-44cb0d80-4dec-11ea-9f52-819cfd4c572a.png)

## API Docs

GET and POST fetch requests are made via RESTful API.

Base API URL is 'https://limitless-fortress-68165.herokuapp.com/api'

### Endpoints:

  - '/games'
  - '/reviews'
  - '/users'
  - '/auth'

## What's Next

  - Add input in AddGame form that allows users to add the cover art for a game
  - Add Public Forum section where users can ask and answer each others questions
  
