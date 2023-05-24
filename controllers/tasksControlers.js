const {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTasksService,
  deleteTasksService,
} = require("../services/tasksServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

let getTasks = async (req, res, next) => {
  const tasks = await getTasksService();
  res.json(tasks);
};
getTasks = asyncWrapper(getTasks);

const getTasksById = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const oneTask = await getTaskByIdService(taskId);
  res.json(oneTask);
});

const addTasks = async (req, res, next) => {
  try {
    const newTask = await addTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updateTask = await updateTasksService(taskId, req.body);
    res.status(200).json(updateTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
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
};

module.exports = {
  getTasks,
  getTasksById,
  addTasks,
  updateTask,
  deleteTask,
};
