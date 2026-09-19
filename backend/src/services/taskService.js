import task from "../model/Task.js";
import AppError from "../utils/AppError.js";
import taskQuery from "../utils/taskQuery.js";

export const getAllTasks = async (filters, userId) => {
  const { filter, fields, sortOptions, skip, limit, page } = await taskQuery(
    filters,
    userId,
  );

  const explainResult = await task
    .find({ priority: "high" })
    .explain("executionStats");
  console.log(explainResult.queryPlanner.winningPlan.inputStage.stage);
  let total = await task.countDocuments(filter);

  let totalPages = Math.ceil(total / limit);

  if (page > totalPages && totalPages > 0) {
    throw new AppError(
      `Page ${page} does not exist. Total pages: ${totalPages}`,
      404,
    );
  }

  let result = await task
    .find(filter)
    .populate("owner", "name email")
    .select(fields.join(" "))
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  let pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };

  return {
    tasks: result,
    pagination,
  };
};

export const getTask = async (id, userId) => {

  console.log(id,userId);
  const result = await task
    .findOne({
      _id: id,
      owner: userId,
    })
    .populate("owner", "name email");

  if (!result) {
    throw new AppError("Task Not Found", 404);
  }

  return result;
};

export const createNewTask = async (taskData, userId) => {
  // console.log("taskData"+taskData);
  return await task.create({
    title: taskData.title,
    description: taskData.description,
    completed: taskData.completed || false,
    priority: taskData.priority,
    dueDate: taskData.dueDate,
    estimatedHours: taskData.estimatedHours,
    owner: userId,
  });
};

export const updateExistingTask = async (id, updates, userId) => {
  const result = await task.findOne({
    _id: id,
    owner: userId,
  });
  console.log(result);
  if (!result) {
    throw new AppError("Task Not Found", 404);
  }

  return await task.findByIdAndUpdate(
    id,
    updates,
    { returnDocument: "after", runValidators: true }, // Returns the updated document and runs Schema validations
  );
};
export const removeTask = async (id, userId) => {
  const result = await task.findOne({
    _id: id,
    owner: userId,
  });

  if (!result) {
    throw new AppError("Task Not Found", 404);
  }

  await result.deleteOne();

  return result;
};




export const searchTasks = async (query, userId) => {
  return await task.find({
    owner: userId,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(5);
};