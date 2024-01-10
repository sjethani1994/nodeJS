const express = require("express");
const {
  addReviews,
  getReviews,
  updateReview,
} = require("../controllers/reviews.controllers");
const jwtHandler = require("../utils/jwthandler");
// creating cusotm route;
const reviewsRoute = express.Router();

reviewsRoute.post("/addReviews", jwtHandler, addReviews);
reviewsRoute.get("/getReviews", jwtHandler, getReviews);
reviewsRoute.post("updateReview/:id", jwtHandler, updateReview);

module.exports = reviewsRoute;
