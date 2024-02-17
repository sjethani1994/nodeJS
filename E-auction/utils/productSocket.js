const ProductModel = require("../models/product.model");

module.exports = async (io, product) => {
  try {
    if (!product) {
      console.log("Product not found");
      return;
    }

    // Prepare data to send
    const productData = {
      productId: product._id,
      bidders: product.bidders.map((bidder) => ({
        userId: bidder._id,
        username: bidder.username,
      })),
    };
    // Emit data through socket
    io.emit("productBidders", productData);
  } catch (error) {
    console.error("Error sending product bidders:", error);
  }
};
