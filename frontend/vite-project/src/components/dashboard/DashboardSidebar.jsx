import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../customhooks/useAuth";
export default function DashboardSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("hi");
    await logout();
    navigate("/login");
  };
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__section">
        <p className="dashboard-sidebar__label">MAIN</p>
        <nav className="dashboard-sidebar__navigation">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "dashboard-sidebar__link dashboard-sidebar__link--active"
                : "dashboard-sidebar__link"
            }
          >
            <span className="dashboard-sidebar__icon">▣</span>
            <span className="dashboard-sidebar__text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive
                ? "dashboard-sidebar__link dashboard-sidebar__link--active"
                : "dashboard-sidebar__link"
            }
          >
            <span className="dashboard-sidebar__icon">☑</span>
            <span className="dashboard-sidebar__text">My Tasks</span>
          </NavLink>
          <NavLink
            to="/files"
            className={({ isActive }) =>
              isActive
                ? "dashboard-sidebar__link dashboard-sidebar__link--active"
                : "dashboard-sidebar__link"
            }
          >
            <span className="dashboard-sidebar__icon">▤</span>
            <span className="dashboard-sidebar__text">My Files</span>
          </NavLink>
        </nav>
      </div>
      <div className="dashboard-sidebar__section">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "dashboard-sidebar__link dashboard-sidebar__link--active"
              : "dashboard-sidebar__link"
          }
        >
          <span className="dashboard-sidebar__icon">⚙</span>
          <span className="dashboard-sidebar__text">Settings</span>
        </NavLink>
      </div>
      <div className="dashboard-sidebar__footer">
        <button
          type="button"
          className="dashboard-sidebar__logout"
          onClick={() => handleLogout()}
        >
          <span className="dashboard-sidebar__icon">↪</span>
          <span className="dashboard-sidebar__text">Logout</span>
        </button>
      </div>
    </aside>
  );
}
