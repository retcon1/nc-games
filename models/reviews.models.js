const db = require("../db/connection");
const format = require("pg-format");

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `
      SELECT * FROM reviews WHERE review_id = $1;
      `,
      [review_id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ msg: "ID Not Found", status: 404 });
      } else {
        return result.rows[0];
      }
    });
};

exports.fetchReviewComments = (review_id) => {
  return db
    .query(
      `
  SELECT * 
  FROM comments 
  WHERE review_id = $1 
  ORDER BY created_at DESC;
  `,
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchAllReviews = (category, sort_by, order) => {
  let reviewQueryStr = `
  SELECT reviews.review_id, reviews.owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer,
  COUNT(comments.comment_id)::INT AS comment_count
  FROM reviews
  LEFT JOIN comments
  ON reviews.review_id = comments.review_id`;
  if (category) reviewQueryStr += ` WHERE category = $1`;
  reviewQueryStr += ` GROUP BY reviews.review_id`;
  reviewQueryStr += ` ORDER BY ${sort_by || "created_at"} ${order || "DESC"}`;

  return db
    .query(reviewQueryStr, category ? [category] : null)
    .then((result) => {
      const reviews = result.rows;
      return reviews;
    });
};

exports.addComment = (review_id, comment) => {
  const commentKeys = Object.keys(comment);
  if (commentKeys.length > 2) {
    return Promise.reject({
      status: 400,
      msg: "Must ONLY include a username and body",
    });
  }
  if (!commentKeys.includes("username") && !commentKeys.includes("body")) {
    return Promise.reject({
      status: 400,
      msg: "Must include a username and body",
    });
  }
  const commentValues = Object.values(comment);
  if (
    typeof commentValues[0] !== "string" &&
    typeof commentValues[1] !== "string"
  ) {
    return Promise.reject({
      status: 400,
      msg: "The username and body must be a string",
    });
  }
  const valuesArray = [+review_id];
  valuesArray.push(commentValues);
  const formattedComment = valuesArray.flat();
  //needed to nest for pg-format to work, don't actually need pg-format but nice as a future reference
  const nestedComment = [formattedComment];
  const addingComment = format(
    `
  INSERT INTO comments
    (review_id, author, body)
  VALUES
    %L
  RETURNING *;
  `,
    nestedComment
  );
  return db.query(addingComment).then((result) => {
    const postedComment = result.rows[0];
    return postedComment;
  });
};

exports.alterVotes = (review_id, votes) => {
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
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;
    `,
      [voteNum, review_id]
    )
    .then((result) => {
      const updatedReview = result.rows[0];
      return updatedReview;
    });
};
