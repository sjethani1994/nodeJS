const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Port = 5000;
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();
const session = require("express-session");
require("dotenv").config();
const MongoStore = require("connect-mongo");
// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

app.use(
  session({
    //
    secret: process.env.SESSION_SECRET_KEY,
    //resave ,is saving the session to session store , even if session has been npt been modified
    resave: false,
    saveUninitialized: false,
    cookie: {
      //  secure: true  //only when u are working with https
      httpOnly: true, // it XSS attacks;
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: process.env.Mongo_Url,
    }),
  })
);
// Function to connect to MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Url);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};

// Invoke the connectDb function to establish a connection to the database
connectDb();

// Importing route modules
const UserRoute = require("./routes/user.routes");
const QuizRoute = require("./routes/quiz.routes");

// Set up routes for different endpoints
app.use("/user", UserRoute);
app.use("/quiz", QuizRoute);

app.use("*", (req, res, next) => {
  const error = new Error("The route does not exists.");
  next(error);
});

app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
1;
