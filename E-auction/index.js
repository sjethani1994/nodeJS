const express = require("express");
const { Server: SocketIOServer } = require("socket.io");
const { createServer } = require("node:http");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = createServer(app);
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();
const startProductSocket = require("./utils/productSocket");
const port = 5000;
app.use("/uploads", express.static("uploads"));
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Function to connect to MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Url);
    console.log("Connected to the database");

    // Start listening for changes in the database
    startProductSocket(io); // Start the socket connection once
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};

// Invoke the connectDb function to establish a connection to the database
connectDb();

// Importing route modules
const UserRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");
// Set up routes for different endpoints
app.use("/user", UserRoute);
app.use("/product", productRoute);

// Error handling middleware
app.use("*", (req, res, next) => {
  const error = new Error("The route does not exist.");
  next(error);
});

app.use(errorHandler);

// Socket connection handling
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log("Server running at http://localhost:5000");
});

// Call the socket setup function every minute
setInterval(() => {
  startProductSocket(io);
}, 60000); // 60000 milliseconds = 1 minute
