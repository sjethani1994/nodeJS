const express = require("express");
const {
  RegisterUser,
  LoginUser,
  updateProfile,
  deleteUser,
  newsLetter,
  getProfileDetails,
} = require("../controllers/user.controllers");
const jwtHandler = require("../utils/jwthandler");
const multerMiddleware = require("../utils/multerMiddleware");
// Creating a custom route using express.Router()
const UserRoute = express.Router();

// Route for user registration
UserRoute.post("/register", RegisterUser);

// Route for user login
UserRoute.post("/login", LoginUser);

// Route for updating user information
UserRoute.post(
  "/updateProfile/:userId",
  jwtHandler,
  multerMiddleware,
  updateProfile
);

UserRoute.get("/getProfile/:userId", jwtHandler, getProfileDetails);

// Route for deleting a user account
UserRoute.post("/deleteUser/:userId", jwtHandler, deleteUser);

// Route for subscribe to newsLetter
UserRoute.post("/newsLetter", jwtHandler, newsLetter);

// Export the UserRoute for use in the main app
module.exports = UserRoute;
