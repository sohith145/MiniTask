import File from "../model/File.js";
import AppError from "../utils/AppError.js";
import fs from "fs/promises";
import path from "path";

export const createFile = async (file, userId) => {
  const result = await File.create({
    originalName: file.originalname,
    fileName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    owner: userId,
  });

  return result;
};

export const getUserFiles = async (userId, filters) => {
  let page = 1;
  let limit = 10;
  let skip = 0;
  const MAX_LIMIT = 100;

  let filter = {
    owner: userId,
  };

  if (filters.search) {
    const escapedSearch = filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    filter.originalName = {
      $regex: escapedSearch,
      $options: "i",
    };
  }

  if (filters.page || filters.limit) {
    if (filters.page) {
      page = Number(filters.page);

      if (!Number.isInteger(page) || page < 1) {
        throw new AppError("page must be a positive integer", 400);
      }
    }

    if (filters.limit) {
      limit = Number(filters.limit);

      if (!Number.isInteger(limit) || limit < 1) {
        throw new AppError("limit must be a positive integer", 400);
      }

      if (limit > MAX_LIMIT) {
        throw new AppError(`limit cannot be greater than ${MAX_LIMIT}`, 400);
      }
    }

    skip = (page - 1) * limit;
  }

  const total = await File.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  if (page > totalPages && totalPages > 0) {
    throw new AppError("Page does not exist", 404);
  }

  const files = await File.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };

  return {
    files,
    pagination,
  };
};

export const getFile = async (id, userId) => {
  const file = await File.findOne({
    _id: id,
    owner: userId,
  });

  if (!file) {
    throw new AppError("File Not Found", 404);
  }

  return file;
};

export const removeFile = async (id, userId) => {
  const result = await getFile(id, userId);

  const filePath = path.join(process.cwd(), result.path);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await File.findByIdAndDelete(id);

  return result;
};

export const searchFiles = async (query, userId) => {
  return await File.find({
    owner: userId,
    originalName: {
      $regex: query,
      $options: "i",
    },
  })
    .sort({ createdAt: -1 })
    .limit(5);
};
