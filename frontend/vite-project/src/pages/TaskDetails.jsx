import DashboardNavbar from "../components/dashboard/DashboardNavbar.jsx";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";
import TaskDetailsCard from "../components/tasks/TaskDetailsCard.jsx";

import "./TaskDetails.css";
import { getTaskById } from "../api/taskApi.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TaskDetails() {
  const { id } = useParams();
  //   console.log(id);
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);

        // console.log("Task:", data);

        setTask(data?.task);
      } catch (error) {
        console.error("Failed to fetch task:", error);
        setError("Unable to load task.");
      }
    };

    fetchTask();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!task) {
    return <div>Loading task...</div>;
  }
  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-layout">
        <DashboardSidebar />

        <main className="dashboard-content task-details-content">
          <div className="task-details-page">
            <div className="task-details-heading">
              <h1>Task Details</h1>

              <p>View and manage your task</p>
            </div>

            <TaskDetailsCard task={task} onTaskUpdated={setTask} />
          </div>
        </main>
      </div>
    </>
  );
}
