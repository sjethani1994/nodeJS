// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Importing route modules
const UserRoute = require("./routes/user.routes");
const CarRoute = require("./routes/car.routes");
const ReviewsRoute = require("./routes/reviews.routes");

// Custom error handling middleware
const errorHandler = require("./utils/errorHandler");

// Load environment variables from .env file
require("dotenv").config();

// Create an Express application
const app = express();

// Set the port for the server
const Port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Function to connect to MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

// Invoke the connectDb function to establish a connection to the database
connectDb();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "None", // Set to 'None' for cross-site requests
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60, // Session TTL in seconds (optional)
    }),
  })
);

// Set up routes for different endpoints
app.use("/user", UserRoute);
app.use("/car", CarRoute);
app.use("/review", ReviewsRoute);

// Middleware for handling non-existent routes
app.use((req, res, next) => {
  const error = new Error("The route does not exist.");
  next(error);
});

// Error handling middleware
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
