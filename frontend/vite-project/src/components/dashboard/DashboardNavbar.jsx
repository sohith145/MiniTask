import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../customhooks/useAuth.js";

import { useState, useEffect, useRef } from "react";

import { searchAll } from "../../api/searchApi.js";

export default function DashboardNavbar() {
  const { user } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState({
    tasks: [],
    files: [],
  });

  const [hasSearched, setHasSearched] = useState(false);

  const searchRef = useRef(null);
  const handleSearch = async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    if (!searchQuery.trim()) {
      return;
    }

    try {
      const data = await searchAll(searchQuery.trim());

      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults({
          tasks: [],
          files: [],
        });
        setHasSearched(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    // console.log("hi");
    await logout();
    navigate("/login");
  };

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar__brand">
        <Link to="/" className="dashboard-navbar__logo">
          MiniTask
        </Link>
      </div>

      <div className="dashboard-navbar__search" ref={searchRef}>
        <input
          type="search"
          placeholder="Search tasks and files..."
          aria-label="Search tasks and files"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleSearch}
        />

        {hasSearched && (
          <div className="dashboard-search-results">
            {searchResults.tasks?.length > 0 && (
              <div className="dashboard-search-section">
                <h3>Tasks</h3>

                {searchResults.tasks.map((task) => (
                  <Link
                    key={task._id}
                    to={`/tasks/${task._id}`}
                    className="dashboard-search-result"
                  >
                    <span className="dashboard-search-result__icon">✓</span>

                    <div className="dashboard-search-result__content">
                      <p>{task.title}</p>
                      <span>{task.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {searchResults.files.map((file) => (
              <Link
                key={file._id}
                to={`/files/${file._id}`}
                className="dashboard-search-result"
              >
                <span className="dashboard-search-result__icon">📄</span>

                <div className="dashboard-search-result__content">
                  <p>{file.originalName}</p>
                  <span>{file.mimeType}</span>
                </div>
              </Link>
            ))}

            {searchResults.tasks?.length === 0 &&
              searchResults.files?.length === 0 && (
                <div className="dashboard-search-empty">
                  <p>No results found</p>
                  <span>Try a different search</span>
                </div>
              )}
          </div>
        )}
      </div>

      <div className="dashboard-navbar__actions">
        {/* <button
          type="button"
          className="dashboard-navbar__notification"
          aria-label="Notifications"
        >
          🔔
        </button> */}

        <div className="dashboard-navbar__profile-container">
          <button
            type="button"
            className="dashboard-navbar__profile"
            aria-label="Open profile menu"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <span className="dashboard-navbar__avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </span>

            <span className="dashboard-navbar__username">{user?.name}</span>

            <span className="dashboard-navbar__arrow">⌄</span>
          </button>

          {profileOpen && (
            <div className="dashboard-profile-menu">
              <p className="dashboard-profile-menu__name">{user?.name}</p>

              <p className="dashboard-profile-menu__email">{user?.email}</p>

              <button
                type="button"
                className="dashboard-profile-menu__logout"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
