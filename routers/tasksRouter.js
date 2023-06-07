const express = require("express");
const {
  getTasks,
  getTasksById,
  addTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControlers");
const { validateBody } = require("../utils/validation/validateBody");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/taskValidationSchemas");

const router = express.Router();

router
  .route("/")
  .get(getTasks)
  .post(validateBody(createTaskValidationSchema), addTasks);
router
  .route("/:taskId")
  .get(getTasksById)
  .patch(validateBody(updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

module.exports = { tasksRouter: router };
