const express = require("express");
const { tasksRouter } = require("./routes/tasksRouter");
const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);
app.use((err, req, res, next) => {
  //   console.log(err);
  //   const { message = "Something went wrong, please try again later" } = err;
  res.status(err.statusCode || 500).json({
    //  message,
    message: err.message || "Something went wrong, please try again later",
  });
});

module.exports = { app };
