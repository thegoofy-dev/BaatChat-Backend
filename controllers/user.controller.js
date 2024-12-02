import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Ensure loggedInUserId is a valid ObjectId
    if (!loggedInUserId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password -email"); // Exclude password and email fields

    // Check if there are any users found
    if (!filteredUsers || filteredUsers.length === 0) {
      return res.status(404).json({ message: "No other users found" });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
