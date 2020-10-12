# Polysearcn

### Version 1.0.0

Welcome to Polyserach, your polyglot word search game!

There are many word search games available online, but none of them feature more than one language at the same time. So, why not make it multilingual? Furthermore, why not make it multiplayer, and have its words retrieved from an online dictionary - in this case, a direct lookup from an API, such as the Lexicala API? 

Having these ideas in mind, we present you PolySearch, the word search game where you can take the opportunity to flex your language learning skills, while having some casual gaming fun! 

This app is built collaboratively by Joao Goncalves Jr, Ryan Hurtis (@rhurtis) and Patrick Mitchener (@pmitchener).

# Working Product

The following features demonstrate the gameplay features of PolySearch, both for single and multiplayer game.

### Main page

From this page, a visitor may create a PolySearch account, start a new single player game, or log in to an existing account.

![PolySearch main page](https://github.com/jgoncalvesjr/polysearch/blob/docs/readme/docs/polysearch_title.png) 

### Single Player 

As a visitor, you may start a single player game, by selecting from four different difficulty levels. Each level represents how many different languages the game will pick up the words from. Currently, there are five different languages supported in PolySearch: **English**, **Brazilian Portuguese**, **Spanish**, **French** and **Italian**. The difficulty settings represent the following amount of different languages:

- **Easy**: One Language
- **Medium**: Two Languages
- **Hard**: Three Languages
- **Expert**: Five Languages

In the game setup, you may also choose the duration of your game. If you just want to chill and don't be bothered by a timer, you may set the timer to zero.

![PolySearch single player setup](https://github.com/jgoncalvesjr/polysearch/blob/docs/readme/docs/polysearch_single_player_settings.png)

Once you start the game, a 15x15 board will be generated, containing 15 words in the languages corresponding to the difficulty level selected. You may search the words by clicking letters horizontally, vertically or diagonally. Words can be found both forward or backwards. Once a word has been found, its display will be highlighted in the board and in the word list.

Once the timer is over or all words are found, a Game Over screen will be displayed showing your score (words found out of 15) and the game's words list. If you haven't created your PolySearch account yet, you will be invited to create one.

![PolySearch single player gameplay](https://github.com/jgoncalvesjr/polysearch/blob/docs/readme/docs/polysearch_single_player_game.png)

![PolySearch game over screen](https://github.com/jgoncalvesjr/polysearch/blob/docs/readme/docs/polysearch_game_over.png) 


### Multiplayer

You must be registered and logged in to PolySerach to host a multiplayer game. Once you set up difficulty and game time, a pre-game lobby screen with the game link and settings will open. A game link will be generated, and you may share this link with any other players, and they may join this link by placing `http://localhost:3000/<link>`.

The game host may start the game anytime by clicking the "Start Game" button. This will start a simultaneous multiplayer session among all players. All players may also chat among themselves during gameplay. 

![PolySearch Multiplayer game lobby](https://github.com/jgoncalvesjr/polysearch/blob/docs/readme/docs/polysearch_multiplayer_lobby.png)
![PolySearch Multiplayer gameplay](https://github.com/jgoncalvesjr/polysearch/blob/docs/readme/docs/polysearch_multiplayer_game.png)

# Setup

1. Clone this repo by using `git clone https://github.com/jgoncalvesjr/polysearch`
2. Access the server folder: `cd server`
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `polysearch`
  - port: `5432`
  - API Token: Basic authentication key from your Lexcala API account (`https://api.lexicala.com/`). You can access it by sending a `GET` request using apps such as Postman or Insomnia.
3. Install dependencies: `npm install` or `yarn install` 
4. Reset the database: `npm run db:reset`
5. Run the server: `npm run dev`
6. Access the client folder: `cd .. && cd client`
7. Install dependencies: `npm install` or `yarn install`
8. Run the client: `npm start` 
9. Access the game: `http://localhost:3000`

# Development

All developers in this project have shared programming and styling roles, and all of them have created at least one of the app's pages on React. However, they also have specific development roles in this project:

- Joao Goncalves Jr (@jgoncalvesjr) is mainly responsible for the backend database and routing logic, as well as the game source word lookup from the Lexicala API, and data transit between server and client using Axios. Joao designed the User Profile page on React.
- Patrick Mitchener (@pmitchener) built the game engine; how the game board was structured and all of its logic and functions, including the rendering of the letters, and how the words were found horizontally, vertically and diagonally - backwards or forwards. Patrick is also responsible for the React frontend design.
- Ryan Hurtis (@rhurtis) handled the websocket configuration and commnunication features for chat and multiplayer interaction using Socket.io. Ryan developed the frontend design alongside Patrick on the frontend, noticeably the login, registration and chat components, using Material UI.

## Future implementations and features

- Improve user interface design
- Implement leaderboard and game statistics
- Create a Custom Mode game where the user may select the languages instead of the AI
- Display the word definitions in the source language as hints, extracted directly from Lexicala just as already available with words
- Implement sound and graphic effects
- Implement voice pronunciation of the words in the original language as they are found in game

## Technologies

- Node.JS
- React
- Material UI
- SASS
- PostgreSQL
- Express
- Socket.io
- Lexicala API

## Dependencies

- axios
- bcrypt
- cors
- express
- pg and pg-native
- socket.io and socket.io-client
- nodemon
- material-ui
- chance
- node-sass
- react
- react-router-dom
- classnames
