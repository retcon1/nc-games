const {
  fetchReviewById,
  fetchReviewComments,
  fetchAllReviews,
  addComment,
  alterVotes,
  addReview,
} = require("../models/reviews.models");
const { checkForReview, checkForCategory } = require("../models/utils");

exports.getAllReviews = (req, res, next) => {
  const { category, sort_by, order, limit, p } = req.query;
  Promise.all([
    fetchAllReviews(category, sort_by, order, limit, p),
    checkForCategory(category),
  ])
    .then((reviews) => {
      res.status(200).send({ reviews: reviews[0] });
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

exports.postComment = (req, res, next) => {
  const comment = req.body;
  const { review_id } = req.params;
  addComment(review_id, comment)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.changeVotes = (req, res, next) => {
  const votes = req.body;
  const { review_id } = req.params;
  Promise.all([alterVotes(review_id, votes), checkForReview(review_id)])
    .then((updatedReview) => {
      res.status(200).send({ updatedReview: updatedReview[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postReview = (req, res, next) => {
  const review = req.body;
  const { category } = review;
  Promise.all([addReview(review), checkForCategory(category)])
    .then((result) => {
      const postedReview = result[0];
      res.status(201).send({ postedReview });
    })
    .catch((err) => {
      next(err);
    });
};
