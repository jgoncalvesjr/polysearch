require('dotenv').config();
const axios = require('axios');
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
      obj.word = result.headword[Math.floor(Math.random() * 1)].text;
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

const getAllMockWords = () => {
  const group = getWords(jsonBR)
    .concat(getWords(jsonEN))
    .concat(getWords(jsonFR))
    .concat(getWords(jsonIT))
    .concat(getWords(jsonES));
  return group;
};

const randomLanguage = () => {
  const languages = ['en', 'br', 'fr', 'es', 'it'];
  return languages[Math.floor(Math.random() * languages.length)];
};

const apiCall = language => {
  return axios.get(`https://dictapi.lexicala.com/search?source=global&language=${language}&sample=30&page-length=30&pos=noun&page=1&monosemous=true`, {
    headers: {
      'Authorization': `Basic ${process.env.APITOKEN}`
    }
  })
    .then((res) => {
      // console.log(res.data);
      return getWords(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGameWords = async(languages, words) => {
  let data = [];
  const block = [];
  const gameLanguages = [];
  while (gameLanguages.length < languages) {
    const newLanguage = randomLanguage();
    if (!gameLanguages.includes(newLanguage)) {
      gameLanguages.push(newLanguage);
    }
  }
  const calls = await Promise.all(gameLanguages.map(apiCall));
  data = calls.reduce((acc, val) => acc.concat(val), []);
  // console.log(Array.isArray(data));
  // console.log(data.length);
  // console.log(gameLanguages);
  while (block.length < words) {
    const newWord = data[Math.floor(Math.random() * data.length)];
    if (newWord && gameLanguages.includes(newWord.language) && newWord.word.length >= 3 && newWord.word.length <= 10) {
      block.push(newWord);
    }
  }
  return block;
};

const getMockGameWords = (languages, words) => {
  const data = getAllMockWords();
  // console.log(Array.isArray(data));
  // console.log(data[0]);
  // console.log(data[0]);
  const block = [];
  const gameLanguages = [];
  while (gameLanguages.length < languages) {
    const newLanguage = data[Math.floor(Math.random() * data.length)].language;
    if (!gameLanguages.includes(newLanguage)) {
      gameLanguages.push(newLanguage);
    }
  }
  // console.log(gameLanguages);
  while (block.length < words) {
    const newWord = data[Math.floor(Math.random() * data.length)];
    if (gameLanguages.includes(newWord.language) && newWord.word.length >= 3 && newWord.word.length <= 10) {
      block.push(newWord);
    }
  }
  return block;
};

module.exports = {
  getGameWords,
  getMockGameWords,
};