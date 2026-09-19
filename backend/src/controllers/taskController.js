import * as taskService from "../services/taskService.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.query, req.user._id);
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    return next(error);
  }
};
export const getTaskById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await taskService.getTask(id, req.user._id);

    res.status(200).json({
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
// console.log("taskData"+req.body)
  try {
    const tasks = await taskService.createNewTask(req.body, req.user._id);

    res.status(201).json({
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const updatedTask = await taskService.updateExistingTask(
    id,
    req.body,
    req.user._id,
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res
    .status(200)
    .json({ message: "Task updated successfully", task: updatedTask });
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;

  await taskService.removeTask(id, req.user._id);

  res.status(200).json({
    message: "Task deleted successfully",
  });
};

export const searchTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.searchTasks(req.query.q, req.user._id);

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
