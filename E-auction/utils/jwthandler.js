const jwt = require("jsonwebtoken");

async function jwtHandler(req, res, next) {
  // Retrieve token from the Authorization header
  const token = req.header("Authorization");

  // Check if the token is not provided
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: no token provided",
    });
  }

  try {
    // Verify and decode the JWT using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Set the decoded user ID in the request object
    req.userId = decoded.data.userId;
    req.username = decoded.data.username;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Token has expired
      return res.status(401).json({
        message: "Unauthorized: token has expired",
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized: invalid token",
      });
    }
  }
}

module.exports = jwtHandler;
