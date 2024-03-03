const express = require("express");
const {
  placeOrder,
  placeOrderSession,
} = require("../controllers/wallet.controller");
const walletRoute = express.Router(); // Corrected variable name

walletRoute.post("/place-order-session", placeOrderSession);
walletRoute.post("/place-order", placeOrder);

// Route to withdraw money from the wallet
// walletRoute.post("/withdraw/:userId", jwtHandler, withdraw);

// Exporting the walletRoute for use in the main app
module.exports = walletRoute;
