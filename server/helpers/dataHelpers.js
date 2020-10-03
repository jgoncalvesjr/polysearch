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
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    case 'expert':
      return 5;
  }
}


const getGamesByUsers = (usersGames) => {
  const gamesByUsers = {};

  for (let game of usersGames) {
    if (!gamesByUsers[game.id]) {
      gamesByUsers[game.id] = {
        id: game.id,
        username: game.username,
        avatar: game.avatar,
        games: [],
      };
    }

    gamesByUsers[game.id].games.push({
      link: game.link,
      mode: game.mode,
      multiplayer: game.multiplayer
    });
  }

  const result = Object.values(gamesByUsers);
  console.log(result);
  return result;
};

module.exports = {
  generateRandomString,
  pickLanguages,
  getGamesByUsers
};