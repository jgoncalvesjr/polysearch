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
  router.put('/', (req, res) => {
    console.log(req.body);
    const newGame = {
      host_id: req.body.host_id,
      mode: req.body.mode,
      multiplayer: req.body.multiplayer,
      link: generateRandomString()
    };
    
    getMockGame(newGame.mode)
      .then(data => {
        console.log("data", data);
        newGame.rows = JSON.stringify(data.rows);
        newGame.words = JSON.stringify(data.words);
        addGame(newGame)
          .then((data) => res.status(200).json(data))
          .catch((err) => res.status(400).json({ err })); 
      })
      .catch((err) => res.json({ err }));  
  });

  // Generate a new game board
  router.get('/newgame', (req, res) => {
    mockMode = 'hard';
    getMockGame(mockMode).then((data) => res.json(data))
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
          const rows = JSON.parse(data.rows);
          const words = JSON.parse(data.words); 
          const game = {
          id: data.id,
          host_id: data.host_id,
          link: data.link,
          mode: data.mode,
          multiplayer: data.multiplayer
        };
          game.rows = rows;
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