# GamesNet

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

Or you could make your own user profile if you like. You would just need to supply your full name, a username, and a protected password
_We do not share any personal information with anyone else._

### Landing Page:
img

If you click on the 'Register' link in the top, right-hand corner of the page, you will be brought to the Registration Page.
### Registration Page:
img

If you successfully log in with a correct username and password, you will be brought to the Game List page.
### Game List Page:
img

Clicking on 'Add Game' will let you add a new game to the list to be reviewed.
### Add Game Page:
img

Clicking on the title or cover image of a game in the list will bring you to the Game Review Page
### Game Review Page:
img

If you want to add a review, click on the 'Add Review' link and it will take you to the Add Review page
### Add Review Page:
img

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
  