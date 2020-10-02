const express = require('express');
const router = express.Router();
const {getGame, getMockGame} = require('../helpers/gameHelpers');

module.exports = ({getDbGame, getAllGames}) => {
  
  // Get all games from DB
  router.get('/', (req, res) => {
    getAllGames().then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  // Generate a new game 
  router.get('/newgame', (req, res) => {
    getMockGame().then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  // Get a specific game
  router.get('/:id', (req, res) => {
    const pageURL = req.url;
    const splitPageURL = pageURL.split('/');
    const game = splitPageURL[splitPageURL.length - 1];
    console.log(game);
    getDbGame(game).then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  return router;
};