import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("authToken", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
    httpOnly: true, // Prevent XSS attacks (cross-site scripting attacks)
    sameSite: "strict", // Prevent CSRF attacks (cross-site request forgery attacks)
    secure: process.env.NODE_ENV !== "development" // Use secure cookies in production
  });
};

export default generateTokenAndSetCookie;
