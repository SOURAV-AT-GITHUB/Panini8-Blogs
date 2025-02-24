const http = require('http');
const express = require("express");
const socketConfig = require("./config/socket.config");
const cors = require("cors");
require("dotenv").config();
const DatabaseConnection = require("./config/database.config");
const UserRouter = require("./routes/user.route");
const BlogRouter = require("./routes/blog.route");

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

// Initialize WebSocket server (Socket.io) on the HTTP server
socketConfig(server);

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Allow any origin or a specific one
  methods: ["GET", "POST"],
  credentials: true
}));

// Routes
app.use("/user", UserRouter);
app.use("/blog", BlogRouter);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Server running fine." });
});

// Start the server and connect to the database
server.listen(PORT, async () => {
  try {
    console.log(`Server running on ${PORT}`);
    await DatabaseConnection;
    console.log("Database connected");
  } catch (error) {
    console.log('Failed to connect to database', error.message);
  }
});
