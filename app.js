const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const {
  getReviewById,
  getAllReviews,
  getReviewComments,
  postComment,
} = require("./controllers/reviews.controllers");
const {
  handle404Errors,
  handle500Errors,
  handleCustomErrors,
  handlePsqlErrors,
  handleOtherErrors,
} = require("./controllers/error-handling.controllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getAllReviews);

app.get("/api/reviews/:review_id/comments", getReviewComments);

app.post("/api/reviews/:review_id/comments", postComment);

app.use(handle404Errors);

app.use(handle500Errors);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleOtherErrors);

module.exports = app;
