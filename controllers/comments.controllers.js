const { removeComment } = require("../models/comments.models");
const { checkForComment } = require("../models/utils");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  Promise.all([checkForComment(comment_id), removeComment(comment_id)])
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
