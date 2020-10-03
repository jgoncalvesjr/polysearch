const express = require('express');
const router = express.Router();
const {getGame, getMockGame} = require('../helpers/gameHelpers');
const {generateRandomString} = require('../helpers/dataHelpers');

module.exports = ({addGame, findGame, getAllGames}) => {
  
  // Get all games from DB
  router.get('/', (req, res) => {
    getAllGames().then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  // Create a new game and store into database
  router.post('/', (req, res) => {
    const newGame = {
      host_id : req.params.user_id,
      mode: req.params.mode,
      multiplayer: req.params.multiplayer,
      link: generateRandomString()
    };
    getMockGame()
      .then(data => {
        newGame.board = JSON.stringify(data.rows);
        newGame.words = JSON.stringify(data.words);
      })
      .catch((err) => res.json({ err }));
      addGame(newGame)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json({ err })); 
  });

  // Generate a new game board
  router.get('/newgame', (req, res) => {
    getMockGame().then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  // Get a specific game from URL
  router.get('/:id', (req, res) => {
    const pageURL = req.url;
    const splitPageURL = pageURL.split('/');
    const url = splitPageURL[splitPageURL.length - 1];
    console.log(url);
    findGame(url)
      .then((data) => {
        if (data) {
          const board = JSON.parse(data.board);
          const words = JSON.parse(data.words); 
          const game = {
          id: data.id,
          host_id: data.host_id,
          link: data.link,
          mode: data.mode,
          multiplayer: data.multiplayer
        };
          game.board = board;
          game.words = words;
          res.status(200).json(game);
        } else {
          res.status(400).send('No game found!');
        }
      })      
      .catch((err) => res.json({ err }));  
  });

  return router;
};