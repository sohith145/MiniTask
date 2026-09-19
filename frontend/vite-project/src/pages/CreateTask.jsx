import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import "./CreateTask.css";
import { createTask } from "../api/taskApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    estimatedHours: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //  console.error("Failed to create task:", formData);
    try {
      await createTask(formData);

      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };  

  return (
    <div className="create-task-page">
      <DashboardNavbar />

      <div className="create-task-layout">
        <DashboardSidebar />

        <main className="create-task-content">
          <div className="create-task-header">
            <h1>Create Task</h1>
            <p>Create a new task and organize your work.</p>
          </div>

          <form className="create-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the task"
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="estimatedHours">Estimated Hours</label>
              <input
                id="estimatedHours"
                name="estimatedHours"
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedHours}
                onChange={handleChange}
                placeholder="e.g. 4"
              />
            </div>

            <div className="create-task-actions">
              <button
                type="button"
                className="cancel-task-btn"
                onClick={() => navigate("/tasks")}
              >
                Cancel
              </button>

              <button type="submit" className="submit-task-btn">
                Create Task
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}