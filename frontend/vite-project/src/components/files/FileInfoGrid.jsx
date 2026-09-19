export default function FileInfoGrid({file}) {


  
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
    <div className="file-details-info">
      <div className="file-details-info__item">
        <span>File Type</span>
        <strong>{formatFileType(file?.mimeType)}</strong>
      </div>

      <div className="file-details-info__item">
        <span>File Size</span>
        <strong>{formatFileSize(file?.size)}</strong>
      </div>

      <div className="file-details-info__item">
        <span>Uploaded</span>
        <strong> {new Date(file?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}</strong>
      </div>
    </div>
  );
}