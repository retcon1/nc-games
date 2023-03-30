const db = require("../db/connection");

exports.removeComment = (comment_id) => {
  return db
    .query(
      `
        DELETE FROM comments
        WHERE comment_id = $1
        `,
      [comment_id]
    )
};
