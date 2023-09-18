const apiRouter = require("express").Router();
const { getEndpoints } = require("../controllers/api.controllers");
const categoriesRouter = require("./categoriesRouter");
const commentsRouter = require("./commentsRouter");
const reviewsRouter = require("./reviewsRouter");
const userRouter = require("./usersRouter");

apiRouter.get("/", getEndpoints);

apiRouter.use("/users", userRouter);

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
