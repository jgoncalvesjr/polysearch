const express = require('express');
const router = express.Router();
const {getGame, getMockGame} = require('../helpers/gameHelpers');

module.exports = () => {
  router.get('/newgame', (req, res) => {
    getMockGame().then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  return router;
};