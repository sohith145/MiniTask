import DashboardNavbar from "../components/dashboard/DashboardNavbar.jsx";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";

import FileDetailsCard from "../components/files/FileDetailsCard.jsx";

import "./FileDetails.css";
import { getFilebyId } from "../api/fileApi.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FileDetails() {
  const { id } = useParams();
  // console.log(id);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const data = await getFilebyId(id);

        console.log("File:", data.File);

        setFile(data.File);
      } catch (error) {
        console.error("Failed to fetch file:", error);
      }
    };

    fetchFile();
  }, [id]);

  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-layout">
        <DashboardSidebar />

        <main className="dashboard-content file-details-content">
          <div className="file-details-page">
            <div className="file-details-heading">
              <h1>File Details</h1>

              <p>View and manage your file</p>
            </div>

            <FileDetailsCard file={file}/>
          </div>
        </main>
      </div>
    </>
  );
}
