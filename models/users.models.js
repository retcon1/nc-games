const db = require("../db/connection");

exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchUser = (username) => {
  return db
    .query(
      `
    SELECT * FROM users
    WHERE username = $1
    `,
      [username]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ msg: "User Not Found", status: 404 });
      } else {
        return result.rows[0];
      }
    });
};
