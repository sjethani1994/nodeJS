const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
exports.signup = async (req, res) => {
  try {
    // Destructure username and password from request body
    const { firstName, lastName, username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user with the same username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      // If user already exists, return a 400 status with a message
      return res.status(400).json({
        message:
          "Username is already taken. Please choose a different username.",
      });
    }

    // If user does not exist, create a new User instance with hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success status with the newly created user and a message
    res.status(201).json({ newUser, message: "User created successfully" });
  } catch (err) {
    // If an error occurs, return a 500 status with the error message
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
