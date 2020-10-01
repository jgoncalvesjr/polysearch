const express = require('express');
const router = express.Router();
const {getGame, getMockGame} = require('../helpers/gameHelpers');

module.exports = ({getAllGames}) => {
  
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

  return router;
};