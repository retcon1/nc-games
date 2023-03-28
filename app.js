const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { getReviewById, getReviewComments } = require('./controllers/reviews.controllers')
const { handle404Errors, handle500Errors, handleCustomErrors, handlePsqlErrors } = require('./controllers/error-handling.controllers')

app.get("/api/categories", getCategories)

app.get('/api/reviews/:review_id', getReviewById)

app.get('/api/reviews/:review_id/comments', getReviewComments)

app.use(handle404Errors)

app.use(handle500Errors)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

module.exports = app;
