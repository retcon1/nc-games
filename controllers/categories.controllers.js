const {
  fetchCategories,
  fetchReviewById,
} = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};
