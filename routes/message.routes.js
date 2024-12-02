import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

const messageRoutes = (io) => {
  router.post("/send/:id", protectRoute, (req, res) =>
    sendMessage(req, res, io)
  );
  router.get("/get/:id", protectRoute, getMessages);
  return router;
};

export default messageRoutes;
