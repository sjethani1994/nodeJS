const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Port = 5000;
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();
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
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};

// Invoke the connectDb function to establish a connection to the database
connectDb();

// Importing route modules
const UserRoute = require("./routes/user.routes");

// Set up routes for different endpoints
app.use("/user", UserRoute);

app.use("*", (req, res, next) => {
  const error = new Error("The route does not exists.");
  next(error);
});

app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
