const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

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
  origin: 'https://aizel.netlify.app/', // Allow requests from your React frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Ensure PATCH is included
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Allow CORS for WebSocket connections
const io = new Server(server, {
    cors: {
        origin: ["https://aizel.netlify.app/"], // Change this to match frontend port
        methods: ["GET", "POST"]
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
