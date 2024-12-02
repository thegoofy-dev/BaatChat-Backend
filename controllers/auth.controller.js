import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const Signup = async (req, res) => {
  try {
    const { userName, email, confirmPassword, gender, password, fullName } =
      req.body;
    if (!userName || !email || !password || !confirmPassword || !fullName || !gender) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ userName });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
        : `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      email,
      userName,
      password: hashedPassword,
      gender,
      profilePic,
    });

    await newUser.save();

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("authToken", "", { maxAge: 0 });
    res.status(200).json({ message: "User Logged out successfully" });
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
