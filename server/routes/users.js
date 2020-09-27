const express = require('express');
const router = express.Router();

// const {getPostsByUsers} = require('../helpers/dataHelpers');

/* GET users listing. */
module.exports = ({ getUsers }) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ err }));
  });

  return router;
};