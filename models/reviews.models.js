const db = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  if (isNaN(review_id)) {
    return Promise.reject({ msg: "ID must be a number", status: 400 });
  }
  return db
    .query(
      `
      SELECT * FROM reviews WHERE review_id = $1;
      `,
      [review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ msg: "Invalid ID", status: 400 });
      } else {
        return result.rows[0];
      }
    });
};

exports.fetchAllReviews = () => {
  return db
    .query(
      `
    SELECT * FROM reviews
    `
    )
    .then((result) => {
      const reviews = result.rows;
      return reviews;
    });
};
