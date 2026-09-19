import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import "./AllTasks.css";
import { getTasks } from "../api/taskApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const TASKS_PER_PAGE = 2;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks(debouncedSearch, currentPage, TASKS_PER_PAGE);

      setTasks(data.tasks.tasks);
      setPagination(data.tasks.pagination);
    };

    fetchTasks();
  }, [debouncedSearch, currentPage]);
  //  console.log(pagination);
  return (
    <div className="all-tasks-page">
      <DashboardNavbar />

      <div className="all-tasks-layout">
        <DashboardSidebar />

        <main className="all-tasks-content">
          <div className="all-tasks-header">
            <div>
              <h1>Tasks</h1>
              <p>Manage and organize your tasks</p>
            </div>

            <button
              className="create-task-btn"
              onClick={() => navigate(`/tasks/create`)}
            >
              + Create Task
            </button>
          </div>

          <div className="all-tasks-toolbar">
            <input
              type="text"
              placeholder="Search tasks..."
              className="task-search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="tasks-table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="task-row"
                      onClick={() => navigate(`/tasks/${task._id}`)}
                    >
                      <td>{task?.title}</td>

                      <td>{task?.priority}</td>

                      <td>
                        {new Date(task?.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td>{task?.completed ? "Completed" : "In Progress"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No tasks to display</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="tasks-pagination">
            <p className="tasks-pagination__info">
              Showing{" "}
              {pagination.total === 0
                ? 0
                : (pagination.page - 1) * pagination.limit + 1}
              –{Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} tasks
            </p>

            <div className="tasks-pagination__controls">
              <button
                type="button"
                className="tasks-pagination__button"
                disabled={!pagination.hasPrevPage}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ← Previous
              </button>

              {Array.from(
                { length: pagination.totalPages || 0 },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`tasks-pagination__page ${
                    pagination.page === page
                      ? "tasks-pagination__page--active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="tasks-pagination__button"
                disabled={!pagination.hasNextPage}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
