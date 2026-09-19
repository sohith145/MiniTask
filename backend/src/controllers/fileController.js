import * as fileService from "../services/fileService.js";
import path from "path";



export const uploadFile = async (req, res, next) => {
  try {
    const file = await fileService.createFile(
      req.file,
      req.user._id
    );

    res.status(201).json({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    next(error);
  }
};


// controller
export const getFiles = async (req, res) => {
  const files = await fileService.getUserFiles(
    req.user._id,
    req.query
  );

  res.status(200).json({
    count: files.length,
    files
  });
};

export const getFileById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const File = await fileService.getFile(id, req.user._id);

    res.status(200).json({
      File
    });
  } catch (error) {
    next(error);
  }
};




export const downloadFile = async (req, res, next) => {
    try {
        const file = await fileService.getFile(
            req.params.id,
            req.user._id
        );

        const filePath = path.join(process.cwd(), file.path);

        res.download(filePath, file.originalName);
    } catch (error) {
        next(error);
    }
};



export const deleteFile = async (req, res, next) => {
    try {
        const file = await fileService.removeFile(
            req.params.id,
            req.user._id
        );

        res.status(200).json({
            message: "File deleted successfully",
            file
        });
    } catch (error) {
        next(error);
    }
};



export const searchFiles = async (req, res, next) => {
  try {
    const files = await fileService.searchFiles(
      req.query.q,
      req.user._id
    );

    res.status(200).json({
      files,
    });
  } catch (error) {
    next(error);
  }
};