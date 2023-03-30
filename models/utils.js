const db = require("../db/connection");

exports.checkForReview = (id) => {
  // if (typeof +id !== "number") {
  //   console.log(id)
  //   return Promise.reject({ status: 404, msg: "Invalid ID" });
  // }
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
