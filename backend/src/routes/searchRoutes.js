import express from "express";

import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import { searchSchema } from "../validation/userValidation.js";

import { searchAll } from "../controllers/searchController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  validate(searchSchema),
  searchAll
);

export default router;