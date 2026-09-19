import User from "../model/User.js";
import Task from "../model/Task.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {
  const result = await User.find();

  return result;
};

export const getUser = async (id, userId) => {
  if (id !== userId.toString()) {
    throw new AppError("You are not allowed to access this user", 403);
  }

  const result = await User.findById(id);

  if (!result) {
    throw new AppError("User Not Found", 404);
  }

  return result;
};

export const createNewUser = async (userData) => {
  return await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
};


export const updateExistingUser = async (id, updates, userId) => {
  if (id !== userId.toString()) {
    throw new AppError(
      "You are not allowed to update this user",
      403
    );
  }
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  Object.assign(user, updates);

  await user.save();

  return user;
};

export const removeUser = async (id, userId) => {
  if (id !== userId.toString()) {
    throw new AppError(
      "You are not allowed to delete this user",
      403
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findById(id).session(session);

    if (!user) {
      throw new AppError("User Not Found", 404);
    }

    await Task.deleteMany({ owner: id }).session(session);

    await User.findByIdAndDelete(id).session(session);

    await session.commitTransaction();

    return true;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    session.endSession();
  }
};

export const userTasks = async (id, userId) => {
  if (id !== userId.toString()) {
    throw new AppError(
      "You are not allowed to access this user's tasks",
      403
    );
  }

  const result = await User.findById(id).populate("tasks");

  if (!result) {
    throw new AppError("User Not Found", 404);
  }

  return result;
};
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
user.password = undefined;
  return {
    user,
    token,
  };
};


export const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};