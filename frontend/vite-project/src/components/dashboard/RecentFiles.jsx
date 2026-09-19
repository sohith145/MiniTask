import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecentFiles } from "../../api/fileApi.js";

export default function RecentFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const data = await getRecentFiles();
    //  console.log(data)
      setFiles(data?.files?.files || []);
    };

    fetchFiles();
  }, []);

  // console.log(files);

  const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatFileType = (mimeType) => {
  const types = {
    "application/pdf": "PDF",
    "image/png": "PNG",
    "image/jpeg": "JPG",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  };

  return types[mimeType] || "FILE";
};


  return (
    <>
    <section className="dashboard-files">
      <div className="dashboard-section__header">
        <h2>Recent Files</h2>
       <Link to="/files" className="dashboard-section__view-all">
          View all →
        </Link>
      </div>
       <div className="dashboard-files__grid">
      {files.length>0 ?
      files.map((file) => (
          <div className="dashboard-file" key={file._id}>
            <div className="dashboard-file__icon">{formatFileType(file.mimeType)} </div>
            <div className="dashboard-file__details">
              <h3>{file.originalName}</h3> <span>{formatFileSize(file?.size)}</span>
            </div>
          </div>
      )):<div>No Files Found</div>}
      </div>
    </section>
    </>
    
  );
}
