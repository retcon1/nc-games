exports.handle404Statuses = (err, req, res, next) => {
  if (err.code === "404") {
    res.status(404)({ msg: "That path does not exist!" });
  } else next(err);
};

exports.handle500Statuses = (err, req, res, next) => {
  if (err.code === 500) {
    res.status(500).send({ msg: "There has been a server error!" });
  } else next(err);
};
