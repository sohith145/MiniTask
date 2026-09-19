import multer from "multer";

// Central error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      type: "error",
      method: req.method,
      url: req.originalUrl,
      statusCode: err.statusCode || 500,
      error: err.name,
      message: err.message,
      ip: req.ip,
    }),
  );

  let statusCode;
  let message;
  let errors = [];

  if (err instanceof multer.MulterError) {
    statusCode = 400;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File size cannot exceed 5 MB";
        break;

      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected file field";
        break;

      case "LIMIT_FILE_COUNT":
        message = "Too many files uploaded";
        break;

      default:
        message = err.message || "File upload error";
    }
    
  }
  else if (err.code === 11000) {
  statusCode = 400;
  message = "Duplicate value";

  const field = Object.keys(err.keyValue || {})[0];

  errors.push({
    field: field || "unknown",
    message: `${field || "Value"} already exists`,
  });
}
 else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid task ID";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";

    if (err.errors && typeof err.errors === "object") {
      Object.entries(err.errors).forEach(([key, value]) => {
        errors.push({
          field: key,
          message: value?.message || String(value),
        });
      });
    }
  } else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation failed";

    errors = (err.issues || []).map((issue) => ({
      field: issue.path?.join(".") || "unknown",
      message: issue.message,
    }));
  } else {
    statusCode = err.statusCode || 500;
    message = err.message || "Internal Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export default errorHandler;
