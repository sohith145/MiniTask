import express from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  getUserTasks,
  login,
  logout,
  getCurrentUser,
} from "../controllers/userController.js";

import validate from "../middleware/validate.js";

import {
  loginSchema,
  registerSchema,
  userIdSchema,
  updateUserSchema,
} from "../validation/userValidation.js";

import protect from "../middleware/authMiddleware.js";

import { loginLimiter } from "../middleware/rateLimitMiddleware.js";

const userrouter = express.Router();

// Login
userrouter.post(
  "/login",
  loginLimiter,
  validate({
    body: loginSchema,
  }),
  login,
);
// Current logged-in user
userrouter.get("/me", protect, getCurrentUser);
// Logout
userrouter.post("/logout", logout);

// Get all users
userrouter.get("/", protect, getUsers);

// Get tasks belonging to a user
userrouter.get(
  "/:id/tasks",
  protect,
  validate({
    params: userIdSchema,
  }),
  getUserTasks,
);

// Get user by ID
userrouter.get(
  "/:id",
  protect,
  validate({
    params: userIdSchema,
  }),
  getUserById,
);

// Create user
userrouter.post(
  "/",
  validate({
    body: registerSchema,
  }),
  createUser,
);

// Update user
userrouter.patch(
  "/:id",
  protect,
  validate({
    params: userIdSchema,
    body: updateUserSchema,
  }),
  updateUser,
);

// Delete user
userrouter.delete(
  "/:id",
  protect,
  validate({
    params: userIdSchema,
  }),
  deleteUser,
);

export default userrouter;
