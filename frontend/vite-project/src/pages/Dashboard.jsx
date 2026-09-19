import "./Dashboard.css";
import { useAuth } from "../customhooks/useAuth.js";
import DashboardNavbar from "../components/dashboard/DashboardNavbar.jsx";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";
import DashboardStats from "../components/dashboard/DashboardStats.jsx";
import RecentTasks from "../components/dashboard/RecentTasks.jsx";
import RecentFiles from "../components/dashboard/RecentFiles.jsx";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();

  // console.log(user, loading, isAuthenticated);
  return (
    <>
      <DashboardNavbar />
      <div className="dashboard-layout">
        <DashboardSidebar />
        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div className="dashboard-welcome__text">
              <h1>Welcome back, {user?.name} 👋</h1>
              <p>Here's what's happening with your tasks and files today.</p>
            </div>
          </section>
          <DashboardStats /> <RecentTasks /> <RecentFiles />
        </main>
      </div>
    </>
  );
}
