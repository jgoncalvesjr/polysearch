const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// register routes
module.exports = ({ addUser }) => {
  
  router.get('/', (req, res) => {
    res.send('Register route');
  });

  router.post('/', (req, res) => {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.body.avatar,
      multiplayerWins: 0
    };
    addUser(newUser)
      .then(result => {
        console.log('User register results:', result);
        const resUser = {};
        resUser.email = result.email;
        resUser.username = result.username;
        res.status(201).json(resUser);
      })
      .catch((err) => res.json({ err }));
  });

  return router;
};