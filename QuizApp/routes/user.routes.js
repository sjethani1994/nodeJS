const express = require("express");
const { RegisterUser, LoginUser } = require("../controllers/user.controllers");
const jwtHandler = require("../utils/jwthandler");
// Creating a custom route using express.Router()
const UserRoute = express.Router();

// Route for user registration
UserRoute.post("/register", RegisterUser);

// Route for user login
UserRoute.post("/login", LoginUser);

// Export the UserRoute for use in the main app
module.exports = UserRoute;