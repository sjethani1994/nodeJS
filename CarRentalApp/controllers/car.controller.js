const CarModel = require("../models/carSchema.model");

/**
 * Function to get a list of cars
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCarList = async (req, res) => {
  try {
    // Fetch all cars from the database
    const allCars = await CarModel.find();

    // Get the user ID from the request
    const userId = req.userId;

    // Return success message and retrieved cars
    res.status(200).json({
      message: "Car list retrieved successfully",
      cars: allCars,
      userId,
    });
  } catch (error) {
    console.error("Error fetching list of cars:", error);

    // Return error message
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Function to add a new car
 * @param {Object} req - Express request object with car details in the body
 * @param {Object} res - Express response object
 */
const addCar = async (req, res) => {
  try {
    const { model, make, year, price, available, features, image } = req.body;

    // Create a new car in the database
    const newCar = await CarModel.create({
      model,
      make,
      year,
      price,
      available,
      features,
      image,
    });

    // Return success message and added car
    res.status(200).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error("Error adding cars:", error);

    // Return error message
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Exporting functions for use in the routes
module.exports = {
  getCarList,
  addCar,
};
