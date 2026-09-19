import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  searchTasks,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
import  validate  from "../middleware/validate.js";
import { searchSchema } from "../validation/userValidation.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.get("/search", protect, validate(searchSchema), searchTasks);
router.get("/:id", protect, getTaskById);
router.post("/", protect, createTask);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);





export default router;
