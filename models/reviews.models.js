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
    SELECT reviews.*,
    COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY created_at DESC;
    `
  );
  return reviews.then((result) => {
    const reviews = result.rows;
    //can map through to turn every string comment_count into a number
    reviews.map(review => review.comment_count = +review.comment_count)
    return reviews;
  });
};
