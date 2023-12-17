const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
require("dotenv").config();
const passport = require("passport");
const app = express();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Define the path to the views directory and serve static files from it
const viewDirectory = path.join(__dirname, "views");
app.use(express.static(viewDirectory));

// Configure session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    store: MongoStore.create({
      mongoUrl: process.env.SESSION_MONGO_URL,
    }),
  })
);

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to ensure user is authenticated before accessing /mainPage
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login.html");
}

// Protected route that requires authentication
app.get("/mainPage", ensureAuthenticated, (req, res) => {
  res.json({ message: `Hi ${req.user.displayName}` });
});

// Import and use Google authentication routes
const GoogleRoutes = require("./passportGoogle");
app.use("/auth", GoogleRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server running on Port 5000");
});
