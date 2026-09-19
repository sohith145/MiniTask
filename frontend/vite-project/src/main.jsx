import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Landing from "./pages/Landing";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import FileDetails from "./pages/FileDetails.jsx";
import AllTasks from "./pages/AllTasks.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import AllFiles from "./pages/AllFiles.jsx";
import UploadFile from "./pages/UploadFile.jsx";
import Settings from "./pages/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "/tasks",
            element: <AllTasks />,
          },
          {
          path: "/files",
            element: <AllFiles />,
          },
           {
            path: "/tasks/create",
            element: <CreateTask />,
          },
          {
            path: "/files/upload",
            element: <UploadFile />,
          },
          {
            path: "/tasks/:id",
            element: <TaskDetails />,
          },
          {
            path: "/files/:id",
            element: <FileDetails />,
          },
          {
            path: "/Settings",
            element: <Settings />,
          },

        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
