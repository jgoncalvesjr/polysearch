
const e = require('express');
const express = require('express');
const router = express.Router();
const generator = require('@sbj42/word-search-generator');
const {getGameWords} = require('../helpers/apiHelpers');

const getBoardWords = wordArray => {
  return wordArray.map(wordObj => {
    return wordObj.word;
  });
};
const getGridRows = puzzle => {
  const gridWords = [];
  let currentPosition = 1;
  for(let i= 0; i < puzzle.height; i++) {
    gridWords.push(puzzle.grid.slice(i * puzzle.width, puzzle.width * currentPosition));
    currentPosition++;
  }
  return gridWords;
};

const getGame = () => {
  return new Promise((resolve, reject) => {
    try {
      const gameWords = getGameWords(3, 12);
      const boardWords = getBoardWords(gameWords);
      const puzzle = generator.generate({
        words: boardWords,
        height: 20,
        width: 20
      });      
      const rows = getGridRows(puzzle);
      //const filteredBoardWords = getFilteredBoardwords(gameWords, puzzle.words);
      const filteredBoardWords = gameWords.filter(wordOj => puzzle.words.includes(wordOj.word));
      const gameBoardAndWords = {rows,  words:filteredBoardWords}
      if (!rows) {
        reject("now words found");
      } else {
        resolve(gameBoardAndWords);
      }      
    }
    catch(err) {
      reject(err);
    }
  });
};
module.exports = () => {
  router.get('/newgame', (req, res) => {
    getGame().then((data) => res.json(data))
    .catch((err) => res.json({ err }));  
  });

  return router;
};