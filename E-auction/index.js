const express = require("express");
const { Server: SocketIOServer } = require("socket.io");
const { createServer } = require("node:http");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = createServer(app);
const Port = 5000;
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();
const startProductSocket = require("./utils/productSocket");
const port = 5000;

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
    credentials: true,
  })
);

// Function to connect to MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Url);
    console.log("Connected to the database");

    // Start listening for changes in the database
    // Start listening for changes in the database
    startProductSocket(io); // Call the function to start the change stream
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

app.use("*", (req, res, next) => {
  const error = new Error("The route does not exist.");
  next(error);
});

app.use(errorHandler);

// Assign io to app.locals to make it accessible globally
app.locals.io = io;

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log("server running at http://localhost:5000");
});
