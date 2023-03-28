const {
  fetchReviewById,
  fetchAllReviews,
} = require("../models/reviews.models");

exports.getAllReviews = (req, res, next) => {
  fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({reviews});
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({review});
    })
    .catch((err) => {
      next(err);
    });
};
