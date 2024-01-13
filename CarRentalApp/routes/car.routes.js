const express = require("express");
const jwtHandler = require("../utils/jwthandler");
const {
  getCarList,
  addCar,
  deleteCar,
  updateCarDetails,
} = require("../controllers/car.controller");

// Creating a custom route using express.Router()
const carListRoute = express.Router();

// Route for retrieving the list of cars
carListRoute.get("/getCarList", jwtHandler, getCarList);

// Route for adding a new car
carListRoute.post("/addCar", jwtHandler, addCar);

// Route for update a car
carListRoute.post("/updateCarDetails/:id", jwtHandler, updateCarDetails);

// Route for deleting a car
carListRoute.post("/deleteCar/:id", jwtHandler, deleteCar);

// Export the carListRoute for use in the main app
module.exports = carListRoute;
