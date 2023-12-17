const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const GoogleRoutes = require("express").Router();

// Step 2: Define Google strategy and use it as Passport.js middleware
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Step 3: Callback function for Google strategy
      console.log(profile);

      // Profile contains user information received from Google.
      // You can create a user schema based on the fields of the profile.

      // Example user schema:
      // userschema: {
      //   profilename,
      //   email,
      //   googleid: profile.id,
      // }

      // Check if the user exists by searching for the Google ID in your database
      // If the user is new, create a new user document; otherwise, retrieve the existing user
      // Example: UserModel.findOne({ googleid: profile.id });

      // In this example, we pass the entire profile to the 'done' function.
      done(null, profile);
    }
  )
);

// Step 4: Define the Google authentication route and load the Passport.js authentication with Google
GoogleRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 5: Callback URL or API endpoint when authentication succeeds
GoogleRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  function (req, res) {
    // Successful authentication, redirect to the dashboard
    res.redirect("/dashboard.html");
  }
);

// Logout route
GoogleRoutes.get("/logout", (req, res, next) => {
  // Logout the user
  req.logout((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    // Redirect to the login page after successful logout
    res.redirect("/login.html");
  });
});

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  // Serialize is used to determine which data of the user should be stored in the session
  // In this example, the entire user profile is stored
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize is used to retrieve user information from the session
  done(null, user);
});

module.exports = GoogleRoutes;
