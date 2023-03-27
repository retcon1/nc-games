const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { handle404Statuses, handle500Statuses } = require('./controllers/error-handling.controllers')

app.use(express.json());

app.get("/api/categories", getCategories)

app.use(handle404Statuses)

app.use(handle500Statuses)

module.exports = app;
