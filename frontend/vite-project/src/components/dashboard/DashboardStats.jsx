import { getTasks } from "../../api/taskApi";
import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();

      // console.log(data.tasks.tasks);
      setTasks(data.tasks.tasks);
    };

    fetchTasks();
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;

  const pendingCount = tasks.filter((task) => !task.completed).length;

  const totalCount = tasks.length;
  return (
    <section className="dashboard-overview">
      <div className="dashboard-stat">
        <span className="dashboard-stat__label"> Total Tasks </span>
        <strong className="dashboard-stat__value"> {totalCount} </strong>
      </div>
      <div className="dashboard-stat">
        <span className="dashboard-stat__label">Pending</span>
        <strong className="dashboard-stat__value"> {pendingCount} </strong>
      </div>
      <div className="dashboard-stat">
        <span className="dashboard-stat__label">Completed</span>
        <strong className="dashboard-stat__value"> {completedCount} </strong>
      </div>
    </section>
  );
}
