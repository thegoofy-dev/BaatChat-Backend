import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_DB_URI;

const connectToMongoDB = async () => {
  if (!MONGO_URL) {
    console.error("MongoDB connection string is not defined in environment variables.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;