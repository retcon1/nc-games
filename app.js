const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { handle404Statuses, handle500Statuses } = require('./controllers/error-handling.controllers');
const { getAllReviews } = require("./controllers/reviews.controllers");

app.use(express.json());

app.get("/api/categories", getCategories)

app.get('/api/reviews', getAllReviews)

app.use(handle404Statuses)

app.use(handle500Statuses)

module.exports = app;
