const express = require('express');
const router = express.Router();

/* GET languages listing. */
module.exports = ({ getLanguages }) => {
  /* GET languages listing. */
  router.get('/', (req, res) => {
    getLanguages()
      .then((languages) => res.json(languages))
      .catch((err) => res.json({ err }));
  });

  return router;
};