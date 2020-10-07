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


const getGamesByUser = (userGames) => {
  console.log(userGames);
  console.log(userGames.game);
  const gamesByUser = {};



    for (let game of userGames) {
      if (!gamesByUser[game.id]) {
        gamesByUser[game.id] = {
          id: game.id,
          username: game.username,
          avatar: game.avatar,
          games: [],
        };
      }
      
      gamesByUser[game.id].games.push({
        link: game.link,
        mode: game.mode,
        multiplayer: game.multiplayer
      });
    }
    

  // const userProfile = gamesByUsers[0];
  const result = Object.values(gamesByUser);
  const userProfile = result[0];
  return userProfile;
};

module.exports = {
  generateRandomString,
  pickLanguages,
  getGamesByUser
};