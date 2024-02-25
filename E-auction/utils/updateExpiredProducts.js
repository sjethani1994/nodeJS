const Product = require("../models/product.model");

async function updateExpiredProducts() {
  try {
    // Get the current date and 24 hours later
    const currentDate = new Date();
    const twentyFourHoursLater = new Date(currentDate);
    twentyFourHoursLater.setDate(currentDate.getDate() + 1);

    // Query for products expiring within the next 24 hours
    const products = await Product.find({
      endDate: { $gte: currentDate, $lt: twentyFourHoursLater },
    });

    for (const product of products) {
      // Update isActive flag based on current date
      if (
        currentDate >= new Date(product.startDate) &&
        currentDate <= new Date(product.endDate)
      ) {
        product.isActive = true;
      } else {
        product.isActive = false;
        // Check if there are any bidders
        if (product.bidders.length > 0) {
          // Sort bidders in descending order based on bid amount
          product.bidders.sort((a, b) => b.bidAmount - a.bidAmount);
          // Update the product with the highest bidder's name
          product.highestBidder = product.bidders[0].username;
        } else {
          // If no bidders, set highestBidder to null or any appropriate default value
          product.highestBidder = null;
        }
      }
      // Save the updated product
      await product.save();
    }

    console.log(
      "Updated isActive flag for products expiring within the next 24 hours."
    );
  } catch (error) {
    console.error("Error updating isActive flag:", error);
  }
}

module.exports = updateExpiredProducts;
