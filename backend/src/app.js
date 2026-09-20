import express from "express";
import router from "./routes/taskRoutes.js";
import userrouter from "./routes/userRoues.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notFoundroute from "./middleware/notFoundroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileRouter from "./routes/fileRoutes.js";
import helmet from "helmet";
import logger from "./middleware/loggerMiddleware.js";
import searchRouter from "./routes/searchRoutes.js";
import fs from "fs";
import path from "path";
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mini-task-rho.vercel.app"],
    credentials: true,
  }),
);
app.use(logger);

const uploadsPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to MiniTask API",
  });
});

app.use("/api/users", userrouter);

app.use("/api/tasks", router);

app.use("/api/files", fileRouter);
app.use("/api/search", searchRouter);

app.use(notFoundroute);
app.use(errorHandler);
export default app;
