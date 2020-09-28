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

  const addUser = (username, email, password, avatar) => {
    const query = {
      text: `INSERT INTO users (username, email, password, avatar, multiplayer_wins)
             VALUES $1, $2, $3, $4, 0
             RETURNING *`,
      values: [username, email, password, avatar]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getLanguages,
    addUser
  };
};