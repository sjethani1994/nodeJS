const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const session = require("express-session");
const Port = 5000;
const path = require("path");
require("dotenv").config();
const MongoStore = require("connect-mongo");
// Middleware to parse JSON requests
app.use(express.json());

const viewDirectory = path.join(__dirname, "views");
app.use(express.static(viewDirectory));
app.use(
  session({
    //
    secret: process.env.SECRET_KEY,
    //resave ,is saving the session to session store , even if session has been npt been modified
    resave: false,
    saveUninitialized: false,
    cookie: {
      //  secure: true  //only when u are working with https
      httpOnly: true, // it XSS attacks;
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: process.env.SESSION_MONGO_URL,
    }),
  })
);

// Middleware to enable CORS
app.use(cors());

function isAuthenticated(req, res, next) {
  // we will check if session has userid;
  // we will pass control to next middleware;
  req.session.userid
    ? next()
    : res.json({ message: "you are not authenticated" });
}

//protected api
app.get("/info", isAuthenticated, (req, res) => {
  res.json({ message: "session class" });
});

app.post("/login", (req, res) => {
  //authentication logic
  //the moment user entered password matches the db password
  req.session.userid = "1234";

  res.json({ message: "hi you are logged in" });
});

app.get("/logout", isAuthenticated, (req, res) => {
  req.session.destroy();
  res.json({ message: "you are logged out" });
});

app.get("/login", (req, res) => {});
// Start the server and listen on the specified port
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
