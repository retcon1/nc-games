const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handle404Errors,
  handle500Errors,
  handleCustomErrors,
  handlePsqlErrors,
  handleOtherErrors,
} = require("./controllers/error-handling.controllers");

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handle404Errors);

app.use(handle500Errors);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleOtherErrors);

module.exports = app;
