const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
// Route for subscribe to newsLetter
router.post("/newsLetter", authController.newsLetter);
module.exports = router;
