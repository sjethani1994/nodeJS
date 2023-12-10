const express = require("express");
const {
  addComments,
  allComments,
  updateComment,
} = require("../controllers/comments.controllers");

// creating cusotm route;
const commentsRoute = express.Router();

commentsRoute.post("/addComments", addComments);
commentsRoute.get("/allComments", allComments);
commentsRoute.post("updateComment/:id", updateComment);

module.exports = commentsRoute;
