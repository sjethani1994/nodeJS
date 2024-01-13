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

/**
 * Function to delete a car
 * @param {Object} req - Express request object with car details in the body
 * @param {Object} res - Express response object
 */
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    // Create a new car in the database
    const deletedCar = await CarModel.findByIdAndDelete(id);

    // Check if the car was found and deleted
    if (!deletedCar) {
      return res.status(404).json({
        message: `car with provided id ${id} not found or could not be deleted`,
      });
    }

    // Return success message and deleted car
    res.status(200).json({
      message: "Car deleted successfully",
      car: deletedCar,
    });
  } catch (error) {
    console.error("Error deleting cars:", error);

    // Return error message
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Function to update a car
 * @param {Object} req - Express request object with car details in the body
 * @param {Object} res - Express response object
 */

const updateCarDetails = async (req, res) => {
  try {
    // Extract car ID from request parameters and car details from request body
    const { id } = req.params;
    const { model, make, year, price, available, features, image } = req.body;

    // Update the car details and get the updated document
    const updatedCarDetails = await CarModel.findByIdAndUpdate(
      id,
      { model, make, year, price, available, features, image },
      { new: true } // This option returns the modified document rather than the original one
    );

    // Check if the car was found and updated
    if (!updatedCarDetails) {
      return res.status(404).json({
        message: "Car not found or could not be updated",
      });
    }

    // Respond with the updated car details
    res.status(200).json({
      message: "Car details updated successfully",
      updatedCarDetails,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during updating car details:", error);

    // Return an internal server error response with details
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Exporting functions for use in the routes
module.exports = {
  getCarList,
  addCar,
  deleteCar,
  updateCarDetails,
};
