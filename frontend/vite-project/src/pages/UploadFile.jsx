import { Navigate } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import "./UploadFile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../api/fileApi";

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      await uploadFile(selectedFile);
      navigate("/files");
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <div className="upload-file-page">
      <DashboardNavbar />

      <div className="upload-file-layout">
        <DashboardSidebar />

        <main className="upload-file-content">
          <div className="upload-file-header">
            <h1>Upload File</h1>
            <p>Upload a file to store and manage it in MiniTask.</p>
          </div>

          <div className="upload-file-card">
            <div className="upload-file-picker">
              <div className="upload-file-icon">↑</div>

              <h2>Select a file</h2>

              <p>Choose a file from your computer to upload.</p>

              <label htmlFor="file-upload" className="choose-file-btn">
                Choose File
              </label>

              <input
                id="file-upload"
                type="file"
                className="file-input"
                onChange={handleFileChange}
              />
            </div>

            {selectedFile && (
              <div className="selected-file">
                <p className="selected-file__label">Selected file</p>
                <p className="selected-file__name">{selectedFile.name}</p>
              </div>
            )}

            <div className="upload-file-actions">
              <button type="button" className="cancel-file-btn">
                Cancel
              </button>

              <button
                type="button"
                className="submit-file-btn"
                disabled={!selectedFile}
                onClick={handleSubmit}
              >
                Upload File
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
