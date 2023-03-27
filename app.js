const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");

app.use(express.json());

app.get("/api/categories", getCategories);

module.exports = app;
