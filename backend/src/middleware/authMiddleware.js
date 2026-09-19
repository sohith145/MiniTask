import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import { findUserById } from "../services/userService.js";

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } 
 else if (req.cookies?.token) {
  token = req.cookies.token;
    }

    if (!token) {
        return next(new AppError("Authentication required", 401));
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }

    try {
        const user = await findUserById(decoded.userId);

        if (!user) {
            return next(new AppError("User no longer exists", 401));
        }

        req.user = {
            _id: user._id,
        };

        next();
    } catch (error) {
        next(error);
    }
};

export default protect;