const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    user: req.user._id,
  });

  return res.status(201).json({
    message: "Task created successfully",
    data: task,
  });
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res.status(200).json({
    message: "Tasks fetched successfully",
    data: tasks,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  return res.status(200).json({
    message: "Task fetched successfully",
    data: task,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;

  const updatedTask = await task.save();

  return res.status(200).json({
    message: "Task updated successfully",
    data: updatedTask,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();

  return res.status(200).json({
    message: "Task deleted successfully",
  });
});

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
