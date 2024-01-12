// Importing required modules and controllers
const express = require("express");
const {
  addReviews,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviews.controllers");
const jwtHandler = require("../utils/jwthandler");

// Creating a custom route for reviews
const reviewsRoute = express.Router();

// Route for adding reviews, with JWT authentication middleware
reviewsRoute.post("/addReviews", jwtHandler, addReviews);

// Route for getting reviews, with JWT authentication middleware
reviewsRoute.get("/getReviews", jwtHandler, getReviews);

// Route for updating a review by ID, with JWT authentication middleware
reviewsRoute.post("/updateReview/:id", jwtHandler, updateReview);

// Route for deleting a review by ID, with JWT authentication middleware
reviewsRoute.post("/deleteReview/:id", jwtHandler, deleteReview);

// Exporting the reviewsRoute for use in other parts of the application
module.exports = reviewsRoute;
