

const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const ConectaToDatabase = require("./config/db")
const { Server } = require('socket.io');
const http = require('http');
const Canvas = require("./models/canvas");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.secratkey;

const userRouter = require('./routers/userRouter');
const canvasRouter = require("./routers/canvasRouter")
const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],  // allow Authorization header
  exposedHeaders: ["Authorization"],                  // important!
  credentials: true
}));
app.use(express.json());
app.use("/users", userRouter);
app.use("/canvas", canvasRouter);
ConectaToDatabase();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
let canvasData = {};
let i = 0; io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinCanvas", async ({ canvasId, token }) => {
    console.log("Joining canvas:", canvasId);
    console.log("joinedCanvas")
    console.log(token);
    try {
      
      if (!token) {
        console.log("No token provided.");
        setTimeout(() => {
          socket.emit("unauthorized", { message: "Access Denied: No Token" });
        }, 100);
        return;
      }

      // Remove 'Bearer ' if present
      const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
      const decoded = jwt.verify(cleanToken, SECRET_KEY);
      const userId = decoded.id;
      console.log("User ID:", userId);

      const canvas = await Canvas.findById(canvasId);
      console.log(canvas)
      if (!canvas || (String(canvas.owner) !== String(userId) && !canvas.shared.includes(userId))) {
        console.log("Unauthorized access.");
        setTimeout(() => {
          socket.emit("unauthorized", { message: "You are not authorized to join this canvas." });
        }, 100);
        return;
      }

      // socket.emit("authorized");

      socket.join(canvasId);
      console.log(`User ${socket.id} joined canvas ${canvasId}`);

      if (canvasData[canvasId]) {

        socket.emit("loadCanvas", canvasData[canvasId]);
      } else {
        socket.emit("loadCanvas", canvas.elements);
      }
    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "An error occurred while joining the canvas." });
    }
  });

  socket.on("drawingUpdate", async ({ canvasId, elements }) => {

    try {
      canvasData[canvasId] = elements;

      socket.to(canvasId).emit("receiveDrawingUpdate", elements);

      const canvas = await Canvas.findById(canvasId);
      if (canvas) {
        // console.log('updating canvas... ', i++)
        await Canvas.findByIdAndUpdate(canvasId, { elements }, { new: true, useFindAndModify: false });
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(8000, () => console.log(' Websoket Server is listening on port 8000.'));
