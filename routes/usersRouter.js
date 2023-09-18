const { getAllUsers, getUser } = require("../controllers/users.controllers");

const userRouter = require("express").Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:username", getUser);

module.exports = userRouter;
