const {
  deleteComment,
  changeComVotes,
} = require("../controllers/comments.controllers");

const commentsRouter = require("express").Router();

commentsRouter.delete("/:comment_id", deleteComment);

commentsRouter.patch("/:comment_id", changeComVotes);

module.exports = commentsRouter;
