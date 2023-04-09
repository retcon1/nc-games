const { removeComment, alterComVotes } = require("../models/comments.models");
const { checkForComment } = require("../models/utils");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.changeComVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const votes = req.body;
  Promise.all([alterComVotes(comment_id, votes), checkForComment(comment_id)])
    .then((updatedComment) => {
      res.status(200).send({ updatedComment: updatedComment[0] });
    })
    .catch((err) => {
      next(err);
    });
};
