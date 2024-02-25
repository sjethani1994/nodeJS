const Product = require("../models/product.model");

async function updateExpiredProducts() {
  try {
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
