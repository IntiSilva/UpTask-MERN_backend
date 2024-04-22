import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

// CORS configuration
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Able to consume API
      callback(null, true);
    } else {
      // Not able
      callback(new Error("Cors Error"));
    }
  },
};

app.use(cors(corsOptions));

// Simple status check endpoint to wake up the service
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend active!' });
});

// Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

// Socket.io
import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Definir los eventos de socket io
  socket.on("open project", (project) => {
    socket.join(project);
  });

  socket.on("new task", (task) => {
    const project = task.project;
    socket.to(project).emit("added task", task);
  });

  socket.on("delete task", (task) => {
    const project = task.project;
    socket.to(project).emit("deleted task", task);
  });

  socket.on("update task", (task) => {
    const project = task.project._id;
    socket.to(project).emit("updated task", task);
  });

  socket.on("change state", (task) => {
    const project = task.project._id;
    socket.to(project).emit("new state", task);
  });
});
