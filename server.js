import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors package
import { app, server, io } from "./socket/socket.js";

dotenv.config(); // Ensure this is at the top

const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your Vercel frontend
const allowedOrigins = ['https://baatchatt.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("BackEnd Completed Successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes(io));
app.use("/api/users", userRoutes);

server.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    connectToMongoDB();
    console.log(`Server is listening on ${PORT}`);
  }
});
