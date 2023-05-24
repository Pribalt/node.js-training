const express = require("express");

const {
  getTasks,
  getTasksById,
  addTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControlers");

const router = express.Router();

router.route("/").get(getTasks).post(addTasks);
router.route("/:taskId").get(getTasksById).patch(updateTask).delete(deleteTask);

module.exports = { tasksRouter: router };
