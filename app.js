const express = require("express");
const { rootRouter } = require("./routers");
const app = express();

app.use(express.json());
app.use("/", rootRouter);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong, please try again later",
  });
});

module.exports = { app };
