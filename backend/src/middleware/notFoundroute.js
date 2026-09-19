import AppError from "../utils/AppError.js";

 const notFoundroute = (req, res, next) => {
  const error = new AppError("Route not found", 404);
  next(error);
};
export default notFoundroute;