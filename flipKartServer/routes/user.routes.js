const express = require("express");
const {
  RegisterUser,
  LoginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

// Creating a custom route using express.Router()
const UserRoute = express.Router();

// Route for user registration
UserRoute.post("/register", RegisterUser);

// Route for user login
UserRoute.post("/login", LoginUser);

// Route for updating user information
UserRoute.post("/updateUser/:userId", updateUser);

// Route for deleting a user account
UserRoute.post("/deleteUser/:userId", deleteUser);

// Export the UserRoute for use in the main app
module.exports = UserRoute;
