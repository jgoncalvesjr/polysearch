module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getLanguages = () => {
    const query = {
      text: 'SELECT * FROM languages',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getAllGames = () => {
    const query = {
      text: 'SELECT * FROM games',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const findGame = (url) => {
    console.log(url)
    const query = {
      text: `SELECT * FROM games WHERE link = $1`,
      values: [url]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };

  const addUser = (newUser) => {
    const query = {
      text: `INSERT INTO users (username, email, password, avatar, multiplayer_wins)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
      values: [newUser.username, newUser.email, newUser.password, newUser.avatar, newUser.multiplayerWins]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };

  const addGame = (newGame) => {
    const query = {
      text: `INSERT INTO games (host_id, link, mode, board, words, multiplayer)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
      values: [newGame.host_id, newGame.link, newGame.mode, newGame.board, newGame.words, newGame.multiplayer]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };

  const logUser = (user) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [user.email]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };

  return {
    getUsers,
    getLanguages,
    findGame,
    addGame,
    getAllGames,
    addUser,
    logUser
  };
};