import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const decoded = verifyToken(token);

    req.userLogged = decoded;

    next();
  } catch (err) {
    console.error("Error checking the authentication", err);
    return res.status(500).json({
      message: "Error checking the authentication",
    });
  }
};
