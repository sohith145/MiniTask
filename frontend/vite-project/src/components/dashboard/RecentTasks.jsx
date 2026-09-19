import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getrecentTasks } from "../../api/taskApi";

export default function RecentTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getrecentTasks();
      setTasks(data.tasks.tasks);
    };

    fetchTasks();
  }, []);

  // console.log(tasks);
  return (
    <section className="dashboard-tasks">
      <div className="dashboard-section__header">
        <h2>Recent Tasks</h2>
        <Link to="/tasks" className="dashboard-section__view-all">
          View all →
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div className="dashboard-tasks__list">
          {tasks.map((task) => (
            <div className="dashboard-task" key={task._id}>
              <div className="dashboard-task__details">
                <h3>{task.title}</h3>
                <span>
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span
                className={`dashboard-task__priority dashboard-task__priority--${task.priority}`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      ) : (
        "No Tasks Found"
      )}
    </section>
  );
}
