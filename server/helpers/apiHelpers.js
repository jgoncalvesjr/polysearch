// const axios = require('axios');
const {
  jsonBR,
  jsonFR,
  jsonES,
  jsonEN,
  jsonIT
} = require('../mocks/apiMocks');

// Gets words from API call and returns a group with language, words and definitions
const getWords = data => {
  const words = [];
  data.results.forEach(result => {
    const obj = {};
    obj.language = result.language;
    if (Array.isArray(result.headword)) {
      obj.word = result.headword[Math.round(Math.random() * 1)].text;
    } else {
      obj.word = result.headword.text;
    }
    if (Array.isArray(result.senses)) {
      if (result.senses[0].definition) obj.definition = result.senses[0].definition;
    } else {
      if (result.senses.definition) obj.definition = result.senses;
    }
    obj.language && obj.word && obj.definition && words.push(obj);
  });
  return words;
};

const getAllWords = () => {
  const group = getWords(jsonBR)
                  .concat(getWords(jsonEN))
                  .concat(getWords(jsonFR))
                  .concat(getWords(jsonIT))
                  .concat(getWords(jsonES));
  return group;
};

const getGameWords = (languages, words) => {
  const data = getAllWords();
  console.log(Array.isArray(data));
  // console.log(data[0]);
  // console.log(data[0]);
  const block = [];
  const gameLanguages = [];
  while (gameLanguages.length < languages) {
    const newLanguage = data[Math.round(Math.random() * data.length)].language;
    if (!gameLanguages.includes(newLanguage)) {
      gameLanguages.push(newLanguage);
    }
  }
  console.log(gameLanguages);
  while (block.length < words) {
    const newWord = data[Math.round(Math.random() * data.length)];
    if (gameLanguages.includes(newWord.language) && newWord.word.length >= 3 && newWord.word.length <= 10) {
      block.push(newWord);
    }
  }
  return block;
};

module.exports = {
  getGameWords,
};