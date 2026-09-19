import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskEditForm from "./TaskEditForm.jsx";
import TaskInfoGrid from "./TaskInfoGrid.jsx";
import { updateTask } from "../../api/taskApi.js";
import { deleteTask } from "../../api/taskApi.js";
export default function TaskDetailsCard({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
    estimatedHours: task?.estimatedHours || "",
    completed: task?.completed || false,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const data = await updateTask(task._id, formData);

      onTaskUpdated(data.task);

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id);
      navigate("/dashboard");
      // We'll add navigation here next.
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <section className="task-details-card">
      {isEditing ? (
        <div>
          <TaskEditForm
            formData={formData}
            onChange={handleFormChange}
            onCancel={() => setIsEditing(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <>
          <div className="task-details-card__header">
            <div className="task-details-card__heading">
              <h2>{task?.title}</h2>
              <p>{task?.description}</p>
            </div>

            <button
              type="button"
              className="task-details-card__edit"
              onClick={() => setIsEditing(true)}
            >
              Edit Task
            </button>
          </div>

          <div className="task-details-card__status">
            <span className="task-details-card__status-dot"></span>
            {task?.completed ? "completed" : "In Progress"}
          </div>

          <div className="task-details-card__divider"></div>

          <div className="task-details-section">
            <div className="task-details-section__heading">
              <h3>Task Information</h3>
              <span>Overview</span>
            </div>

            <TaskInfoGrid task={task} />
          </div>

          <div className="task-details-card__divider"></div>

          <div className="task-details-description">
            <h3>Description</h3>
            <p>{task?.description}</p>
          </div>

          <div className="task-details-card__footer">
            <button
              type="button"
              className="task-details-card__delete"
              onClick={handleDeleteTask}
            >
              Delete Task
            </button>
          </div>
        </>
      )}
    </section>
  );
}
