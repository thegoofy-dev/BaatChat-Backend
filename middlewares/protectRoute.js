import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;   //Error: Used authtoken instead of authToken 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Authorization Denied - No token provided!" });
    } else if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    } else if (!user) {
      return res.status(404).json({ error: "User Not found!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middeware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
