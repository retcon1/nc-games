const { getCategories } = require("../controllers/categories.controllers");

const categoriesRouter = require("express").Router();

categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;