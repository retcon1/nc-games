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
  const reviews = db.query(
    `
    SELECT * FROM reviews
    ORDER BY created_at DESC
    `
  );
  const comments = db.query(
    `
    SELECT * FROM comments
    `
  );
  return Promise.all([reviews, comments]).then((result) => {
    const reviews = result[0].rows;
    const comments = result[1].rows;
    reviews.map((review) => {
      let count = 0;
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].review_id === review.review_id) count++;
      }
      review.comment_count = count;
    });
    return reviews;
  });
};
