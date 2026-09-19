import * as taskService from "../services/taskService.js";
import * as fileService from "../services/fileService.js";

export const searchAll = async (req, res, next) => {
  try {
    const query = req.query.q;
    const userId = req.user._id;

    const [tasks, files] = await Promise.all([
      taskService.searchTasks(query, userId),
      fileService.searchFiles(query, userId),
    ]);

    res.status(200).json({
      tasks,
      files,
    });
  } catch (error) {
    next(error);
  }
};