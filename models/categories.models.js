const db = require("../db/connection");

exports.fetchCategories = () => {
  return db
    .query(
      `
    SELECT * FROM categories;
    `
    )
    .then((result) => {
      const categories = result.rows;
      return categories;
    });
};


