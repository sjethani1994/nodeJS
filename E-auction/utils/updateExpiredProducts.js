const Product = require("../models/product.model");

async function updateExpiredProducts() {
  try {
    const currentDate = new Date();

    const products = await Product.find({});

    for (const product of products) {
      // Check if the current date is within the range of startDate and endDate
      if (
        currentDate >= new Date(product.startDate) &&
        currentDate <= new Date(product.endDate)
      ) {
        product.isActive = true;
      } else {
        product.isActive = false;
      }

      await product.save();
    }

    console.log(
      "Updated isActive flag for products based on startDate and endDate."
    );
  } catch (error) {
    console.error("Error updating isActive flag:", error);
  }
}

module.exports = updateExpiredProducts;
