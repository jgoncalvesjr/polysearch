const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
// login routes
module.exports = ({ logUser }) => {

  router.get('/', (req, res) => {
    res.send('Login route');
  });

  router.post('/', (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    logUser(user)
      .then(result => {
        if (bcrypt.compareSync(user.password, result.password)) {
      
          //console.log('login successful')
          res.status(200).json({ result });
          
        } else {
          res.status(400).send('Wrong password');
        }
      })
      .catch(() => res.status(404).send('User and/or password error'));
  });

  return router;
};