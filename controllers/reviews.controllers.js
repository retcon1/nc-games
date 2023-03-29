const {
  fetchReviewById,
  fetchReviewComments,
  fetchAllReviews
} = require("../models/reviews.models");
const { checkForReview } = require("../models/utils");


exports.getAllReviews = (req, res, next) => {
  fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  Promise.all([fetchReviewComments(review_id), checkForReview(review_id)])
    .then((comments) => {
      res.status(200).send({ comments: comments[0] });
    })
    .catch((err) => {
      next(err);
    });
};
