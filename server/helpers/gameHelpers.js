const generator = require('@sbj42/word-search-generator');
const {getGameWords, getMockGameWords} = require('./apiHelpers');

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
  return new Promise(async(resolve, reject) => {
    try {
      const gameWords = await getGameWords(3, 12);
      const boardWords = getBoardWords(gameWords);
      const puzzle = generator.generate({
        words: boardWords,
        height: 20,
        width: 20
      });      
      const rows = getGridRows(puzzle);
      //const filteredBoardWords = getFilteredBoardwords(gameWords, puzzle.words);
      const filteredBoardWords = gameWords.filter(wordObj => puzzle.words.includes(wordObj.word));
      const gameBoardAndWords = {rows,  words:filteredBoardWords}
      if (!rows) {
        reject("No words found!");
      } else {
        resolve(gameBoardAndWords);
      }      
    }
    catch(err) {
      reject(err);
    }
  });
};

const getMockGame = () => {
  return new Promise((resolve, reject) => {
    try {
      const gameWords = getMockGameWords(3, 12);
      const boardWords = getBoardWords(gameWords);
      const puzzle = generator.generate({
        words: boardWords,
        height: 20,
        width: 20
      });      
      const rows = getGridRows(puzzle);
      //const filteredBoardWords = getFilteredBoardwords(gameWords, puzzle.words);
      const filteredBoardWords = gameWords.filter(wordObj => puzzle.words.includes(wordObj.word));
      const gameBoardAndWords = {rows,  words:filteredBoardWords}
      if (!rows) {
        reject("No words found!");
      } else {
        resolve(gameBoardAndWords);
      }      
    }
    catch(err) {
      reject(err);
    }
  });
};

module.exports = {
  getGame,
  getMockGame
};