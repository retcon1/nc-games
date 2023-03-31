const db = require("../db/connection");

exports.checkForReview = (id) => {
  return db
    .query(
      `
    SELECT * FROM reviews WHERE review_id = $1
    `,
      [id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found" });
      } else return true;
    });
};

exports.checkForCategory = (category) => {
  if (!category) return;
  return db
    .query(
      `
  SELECT * FROM categories WHERE slug = $1
  `,
      [category]
    )
    .then(({ rows }) => {
      console.log(rows);
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Category Not Found" });
      } else return true;
    });
};
