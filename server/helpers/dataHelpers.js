// General data helpers


// Generates a six alphanumeric random string
const generateRandomString = () => {
  return Math.random().toString(36).substring(2,8);
};

// Determines amount of languages to pick words based on difficulty
const pickLanguages = mode => {
  switch (mode) {
    case 'easy':
      return 1;
    case 'normal':
      return 2;
    case 'hard':
      return 3;
    case 'expert':
      return 5;
  }
}

module.exports = {
  generateRandomString,
  pickLanguages,
};