const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {getGamesByUser} = require('../helpers/dataHelpers');

/* GET users listing. */
module.exports = ({ getUserProfile, updateUser, getUsers }) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ err }));
  });

  // Get an user profile
  router.get('/:id', (req, res) => {
    const pageURL = req.url;
    const splitPageURL = pageURL.split('/');
    const id = splitPageURL[splitPageURL.length - 1];
    // const id = req.body.id;
    getUserProfile(id)
      .then((user) => {
        console.log(getGamesByUser(user));
        res.status(200).json(getGamesByUser(user));
      }) 
      .catch((err) => res.json({ err }));
  });
  
  // Update user profile and send updated profile
  router.put('/:id', (req, res) => {
    const user = {
      id: req.body.id,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.body.avatar
    };
    updateUser(user)
      .then(() => {
        getUserProfile(user.id)
          .then((user) => res.status(200).json(getGamesByUser(user)))
          .catch((err) => res.json({ err }));
      })
      .catch((err) => res.json({ err }));
  });

  return router;
};

