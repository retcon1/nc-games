const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { getReviewById } = require('./controllers/reviews.controllers')
const { handle404Statuses, handle500Statuses, handle400Statuses, handleCustomErrors } = require('./controllers/error-handling.controllers')

app.use(express.json());

app.get("/api/categories", getCategories)

app.get('/api/reviews/:review_id', getReviewById)

app.use(handle404Statuses)

app.use(handle500Statuses)

app.use(handle400Statuses)

app.use(handleCustomErrors)

module.exports = app;
