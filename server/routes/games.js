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