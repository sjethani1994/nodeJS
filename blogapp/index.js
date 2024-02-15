const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Port = 5000;
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());
app.use("/uploads", express.static("uploads"));
// Function to connect to MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Url);
    console.log("Connencted to Database.");
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};

// Invoke the connectDb function to establish a connection to the database
connectDb();
// Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/profile", profileRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("The route does not exists.");
  next(error);
});

app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
