const express = require("express");
const {
  addComments,
  allComments,
  updateComment,
} = require("../controllers/comments.controllers");
const jwtHandler = require("../utils/jwthandler");
// creating cusotm route;
const commentsRoute = express.Router();

commentsRoute.post("/addComments", jwtHandler, addComments);
commentsRoute.get("/allComments", jwtHandler, allComments);
commentsRoute.post("updateComment/:id", jwtHandler, updateComment);

module.exports = commentsRoute;
