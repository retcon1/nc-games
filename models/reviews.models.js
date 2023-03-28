const db = require("../db/connection");

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
