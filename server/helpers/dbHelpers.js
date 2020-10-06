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
      text: `INSERT INTO games (host_id, link, duration, mode, rows, words, multiplayer)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
      values: [newGame.host_id, newGame.link, newGame.duration, newGame.mode, newGame.rows, newGame.words, newGame.multiplayer]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };

  const getUserProfile = (id) => {
    const query = {
      text: 
        `SELECT users.id, username, avatar, multiplayer_wins, link, mode, multiplayer FROM users
         LEFT JOIN games ON games.host_id = users.id
         WHERE users.id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => console.error('query error', err.stack));
  };

  const updateUser = (user) => {
    const query = {
      text: 
        `UPDATE users
        SET password = $1, avatar = $2
        WHERE id = $3`,
      values: [user.password, user.avatar, user.id]
    };

    return db
      .query(query)
      .then((result) => result.rows)
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
    getUserProfile,
    logUser,
    updateUser
  };
};