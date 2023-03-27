exports.handle404Statuses = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404)({ msg: "That path does not exist!" });
  } else next(err);
};

exports.handle500Statuses = (err, req, res, next) => {
  if (err.code === 500) {
    res.status(500).send({ msg: "There has been a server error!" });
  } else next(err);
};

exports.handle400Statuses = (err, req, res, next) => {
  if (err.code === 400) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
};
