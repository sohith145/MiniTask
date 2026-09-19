import FileInfoGrid from "./FileInfoGrid.jsx";
import { deleteFile, downloadFile } from "../../api/fileApi.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function FileDetailsCard({ file }) {
  // console.log(file?.originalName)
const navigate = useNavigate();
  const getFileTypeLabel = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return "PDF document";

      case "image/png":
        return "PNG image";

      case "image/jpeg":
        return "JPG image";

      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "Word document";

      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "Excel spreadsheet";

      default:
        return "File";
    }
  };

  const handleDownload = async () => {
    try {
      const data = await downloadFile(file._id);

      const fileUrl = URL.createObjectURL(data);

      const link = document.createElement("a");

      link.href = fileUrl;
      link.download = file.originalName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };
  
    
   const handleDeleteFile = async () => {
      try {
        await deleteFile(file._id);
        navigate("/dashboard");
      } catch (error) {
          console.error("Failed to delete file:", error);
        }
    };


  return (
    <section className="file-details-card">
      <div className="file-details-card__header">
        <div className="file-details-card__file">
          <div className="file-details-card__icon">📄</div>

          <div>
            <h2>{file?.originalName}</h2>

            <p>{getFileTypeLabel(file?.mimeType)}</p>
          </div>
        </div>

        <button
          type="button"
          className="file-details-card__download"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      <div className="file-details-card__divider"></div>

      <div className="file-details-section">
        <div className="file-details-section__heading">
          <h3>File Information</h3>

          <span>Overview</span>
        </div>

        <FileInfoGrid file={file} />
      </div>

      <div className="file-details-card__footer">
        <button type="button" className="file-details-card__delete" onClick={handleDeleteFile}>
          Delete File
          
        </button>
      </div>
    </section>
  );
}
