import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import { app, server, io } from "./socket/socket.js";

dotenv.config(); // Ensure this is at the top

const PORT = process.env.PORT || 5000;

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
