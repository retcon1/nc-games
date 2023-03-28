exports.handle404Errors = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404)({ msg: "That path does not exist!" });
  } else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  if (err.code === 500) {
    res.status(500).send({ msg: "There has been a server error!" });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: "Invalid ID" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
};