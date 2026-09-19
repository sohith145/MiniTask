import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import "./AllFiles.css";
import { getFiles } from "../api/fileApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllFiles() {
  const [files, setFiles] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const FILES_PER_PAGE = 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const fetchFiles = async () => {
      const data = await getFiles(debouncedSearch, currentPage, FILES_PER_PAGE);
      console.log(data.files);
      setFiles(data.files.files);
      setPagination(data.files.pagination);
    };

    fetchFiles();
  }, [debouncedSearch, currentPage]);

  const formatFileType = (mimeType) => {
    const types = {
      "application/pdf": "PDF",
      "image/png": "PNG",
      "image/jpeg": "JPG",
      "application/msword": "DOC",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "DOCX",
      "application/vnd.ms-excel": "XLS",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "XLSX",
    };

    return types[mimeType] || "FILE";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="all-files-page">
      <DashboardNavbar />

      <div className="all-files-layout">
        <DashboardSidebar />

        <main className="all-files-content">
          <div className="all-files-header">
            <div>
              <h1>My Files</h1>
              <p>Manage and organize your uploaded files.</p>
            </div>

            <button
              type="button"
              className="upload-file-btn"
              onClick={() => navigate(`/files/upload`)}
            >
              + Upload File
            </button>
          </div>

          <div className="all-files-toolbar">
            <input
              type="text"
              className="file-search-input"
              placeholder="Search files..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="files-table-wrapper">
            <table className="files-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                </tr>
              </thead>

              <tbody>
                {files.length > 0 ? (
                  files.map((file) => (
                    <tr
                      key={file._id}
                      className="file-row"
                      onClick={() => navigate(`/files/${file._id}`)}
                    >
                      <td>{file?.originalName}</td>

                      <td>{formatFileType(file?.mimeType)}</td>

                      <td>{formatFileSize(file?.size)}</td>

                      <td>
                        {" "}
                        {new Date(file?.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No files to display</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="files-pagination">
            <p className="files-pagination__info">
              Showing{" "}
              {pagination.total === 0
                ? 0
                : (pagination.page - 1) * pagination.limit + 1}
              –{Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} files
            </p>

            <div className="files-pagination__controls">
              <button
                type="button"
                className="files-pagination__button"
                disabled={!pagination.hasPrevPage}
                onClick={() => setCurrentPage(currentPage - 1)}
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
                  className={`files-pagination__page ${
                    pagination.page === page
                      ? "files-pagination__page--active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="files-pagination__button"
                disabled={!pagination.hasNextPage}
                onClick={() => setCurrentPage(currentPage + 1)}
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
