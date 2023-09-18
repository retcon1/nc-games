const {
  getReviewById,
  getAllReviews,
  getReviewComments,
  postComment,
  changeVotes,
  postReview,
} = require("../controllers/reviews.controllers");

const reviewsRouter = require("express").Router();

reviewsRouter.get("/:review_id", getReviewById);

reviewsRouter.get("/", getAllReviews);

reviewsRouter.get("/:review_id/comments", getReviewComments);

reviewsRouter.post("/:review_id/comments", postComment);

reviewsRouter.post("/", postReview);

reviewsRouter.patch("/:review_id", changeVotes);

module.exports = reviewsRouter;
