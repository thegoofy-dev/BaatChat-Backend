import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Changed from unique: true to required: true
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Message = mongoose.model("Message", messageSchema);

export default Message;
