const {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTasksService,
  deleteTasksService,
} = require("../services/tasksServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

const getTasks = asyncWrapper(async (req, res) => {
  const { page = 1, limit = 10, completed } = req.query;
  const tasks = await getTasksService(page, limit, completed);
  res.json(tasks);
});

const getTasksById = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const oneTask = await getTaskByIdService(taskId);
  res.json(oneTask);
});

const addTasks = asyncWrapper(async (req, res, next) => {
  try {
    const newTask = await addTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

const updateTask = asyncWrapper(async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updateTask = await updateTasksService(taskId, req.body);
    res.status(200).json(updateTask);
  } catch (error) {
    next(error);
  }
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deleteTaskId = await deleteTasksService(taskId);
    res.status(200).json({ id: deleteTaskId });
    // Інші можливі варіанти
    //   res.status(204).json({ id: deleteTaskId });
    //   res.sendStatus(204);
    return deleteTaskId;
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getTasks,
  getTasksById,
  addTasks,
  updateTask,
  deleteTask,
};
