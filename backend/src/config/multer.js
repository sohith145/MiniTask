import multer from "multer";
import AppError from "../utils/AppError.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
filename: (req, file, cb) => {
    const extension = file.originalname.substring(
        file.originalname.lastIndexOf(".")
    );

    const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;

    cb(null, filename);
},
});

const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new AppError(
            "Only PDF, PNG, JPG, DOC, DOCX, XLS and XLSX files are allowed"
       ,400);

        cb(error, false);
    }
};

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter
});

export default upload;