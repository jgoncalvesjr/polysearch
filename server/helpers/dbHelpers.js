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

  const getDbGame = (game) => {
    console.log(game)
    const query = {
      text: `SELECT * FROM games WHERE id = $1`,
      values: [game]
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
    getDbGame,
    getAllGames,
    addUser,
    logUser
  };
};