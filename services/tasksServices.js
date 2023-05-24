const fs = require("fs/promises");
const path = require("path");
// const tasksPath = path.join(__dirname, "db", "tasks.json")
const tasksPath = path.join(process.cwd(), "db", "tasks.json");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");

const writeDb = (tasks) => {
  return fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
};

const getTasksService = async () => {
  const tasks = await fs.readFile(tasksPath);

  return JSON.parse(tasks);
};

const getTaskByIdService = async (taskId) => {
  const tasks = await getTasksService();

  return tasks.find(({ id }) => id === taskId);
};

const addTaskService = async (data) => {
  const tasks = await getTasksService();
  const newTask = {
    id: crypto.randomUUID(),
    ...data,
  };

  tasks.push(newTask);

  await writeDb(tasks);

  return newTask;
};

const updateTasksService = async (taskId, data) => {
  const tasks = await getTasksService();
  const index = tasks.findIndex(({ id }) => id === taskId);

  if (index === -1) {
    //  throw new Error("Task not found");
    throw new HttpError(404, "Task not found");
  }

  //   tasks[index] = { ...tasks[index], ...data };
  tasks.splice(index, 1, { ...tasks[index], ...data });

  await writeDb(tasks);

  return tasks[index];
};

const deleteTasksService = async (taskId) => {
  const tasks = await getTasksService();
  const index = tasks.findIndex(({ id }) => id === taskId);

  if (index === -1) {
    //  throw new Error("Task not found");
    throw new HttpError(404, "Task not found");
  }

  tasks.splice(index, 1);

  await writeDb(tasks);

  return taskId;
};

module.exports = {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTasksService,
  deleteTasksService,
};
