const express = require("express");
const { authRouter } = require("./authRouter");
const { tasksRouter } = require("./tasksRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/tasks", tasksRouter);

module.exports = { rootRouter: router };
