import express from "express";
import upload from "../config/multer.js";
import protect from "../middleware/authMiddleware.js";
import {
  uploadFile,
  getFiles,
  getFileById,
  downloadFile,deleteFile,searchFiles
} from "../controllers/fileController.js";
import validate from "../middleware/validate.js";
import { searchSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);


router.get("/", protect, getFiles);

router.get(
  "/search",
  protect,
  validate(searchSchema),
  searchFiles
);
router.get("/:id/download", protect, downloadFile);

router.get("/:id", protect, getFileById);
router.delete("/:id", protect, deleteFile);
export default router;
