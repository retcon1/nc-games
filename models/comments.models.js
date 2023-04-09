const db = require("../db/connection");

exports.removeComment = (comment_id) => {
  return db
    .query(
      `
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *
        `,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      }
    });
};

exports.alterComVotes = (comment_id, votes) => {
  const votesKey = Object.keys(votes);
  if (votesKey.length > 1) {
    return Promise.reject({
      status: 400,
      msg: "Must ONLY include an inc_votes key with a num value",
    });
  }
  if (!votesKey.includes("inc_votes")) {
    return Promise.reject({
      status: 400,
      msg: "Must have a key of inc_votes",
    });
  }
  const votesValue = Object.values(votes);
  if (typeof votesValue[0] !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Must have a number value",
    });
  }
  const voteNum = Number(votes.inc_votes);
  return db
    .query(
      `
    UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *;
    `,
      [voteNum, comment_id]
    )
    .then((result) => {
      const updatedReview = result.rows[0];
      return updatedReview;
    });
}