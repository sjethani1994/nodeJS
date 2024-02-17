const ProductModel = require("../models/product.model");

module.exports = async (io) => {
  try {
    // Create a change stream for the products collection
    const changeStream = ProductModel.watch();

    // Listen for change events
    changeStream.on("change", async (change) => {
      console.log("Change detected:", change);

      // Get the updated product from the database
      const product = await ProductModel.findById(change.documentKey._id);

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
    });

    console.log("Listening for changes in products collection...");
  } catch (error) {
    console.error("Error setting up change stream:", error);
  }
};
