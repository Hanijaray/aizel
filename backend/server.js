const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dashboardRoutes = require('./routes/dashboardRoutes');

require('dotenv').config();
const connectDB = require('./config/db');
const driverRoutes = require('./routes/workerRoutes');
const workerReportRoute = require('./routes/WorkerReportRoute');
const distanceRoutes = require('./routes/DistanceRoutes');
const accessRequests = require("./routes/accessRequests");
const addAnnouncementRoutes = require("./routes/addAnnouncementRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
const server = http.createServer(app);
app.use(express.json()); // Ensure this line is present

// ✅ Allow CORS for API routes
app.use(cors({
  origin: 'https://aizel.netlify.app', // Allow requests from your React frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Ensure PATCH is included
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Allow CORS for WebSocket connections
const io = new Server(server, {
    cors: {
        origin: ["https://aizel.netlify.app"], // Change this to match frontend port
        methods: ["GET", "POST"]
    }
});
const TaskSchema = new mongoose.Schema({
    employeeName: String,
    employeeID: String,
    definedDate: String,
    deadlineDate: String,
    category: String,
    subject: String,
    details: String,
    task: { type: String, default: "Report Subject" },
    state: { type: String, default: "Pending" },
    currentDate: { type: String, default: () => new Date().toISOString() },
  }, { collection: "tasks" }); // Ensure collection is "tasks"
  
  // 📌 Create Task Model
  const Task = mongoose.model("Task", TaskSchema);
  app.use('/dashboard-tasks', dashboardRoutes);
  // 📌 Get all tasks
  app.get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });
  
  // 📌 Add a new task
  app.post("/tasks/add", async (req, res) => {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(201).json({ message: "✅ Task added successfully", newTask });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  app.put("/tasks/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTask) return res.status(404).json({ message: "Task not found" });
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.put('/tasks/update/:id', async (req, res) => {
    try {
      const { state } = req.body;
      await Task.findByIdAndUpdate(req.params.id, { state });
      res.status(200).send('Task updated successfully');
    } catch (error) {
      res.status(500).json({ error: 'Error updating task' });
    }
  });
  
  
  // 📌 Update task state (Mark as "Completed")
  app.put("/tasks/update/:id", async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, { state: req.body.state }, { new: true });
      res.json({ message: "✅ Task updated successfully", updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  });
  
  // 📌 Delete a task
  app.delete("/tasks/delete/:id", async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "✅ Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  });
// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use('/api/drivers', driverRoutes);
app.use('/api/reports', workerReportRoute);
app.use('/api/distance', distanceRoutes);
// Routes
app.use("/api/accessRequests", accessRequests);
app.use("/api/announcements", addAnnouncementRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Socket.io setup
let drivers = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('updateLocation', ({ driverId, lat, long, totalDistance }) => {
        console.log(`Location update from ${driverId}:`, { lat, long, totalDistance });
        socket.driverId = driverId;
        drivers[driverId] = { lat, long, totalDistance, startTime: new Date().toISOString() };
        io.emit('locationUpdate', drivers);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (socket.driverId) {
            delete drivers[socket.driverId];
            io.emit('locationUpdate', drivers);
        }
    });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
