const express = require('express');
const router = express.Router();
const {getGame, getMockGame} = require('../helpers/gameHelpers');

module.exports = ({findGame, getAllGames}) => {
  
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
    const url = splitPageURL[splitPageURL.length - 1];
    console.log(url);
    findGame(url)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).send('No game found!');
        }
      })      
      .catch((err) => res.json({ err }));  
  });

  return router;
};