const ProductModel = require("../models/product.model");

module.exports = async (io) => {
  let changeStream; // Define changeStream outside the try block

  const setupChangeStream = () => {
    try {
      // Create a change stream for the products collection
      changeStream = ProductModel.watch();

      // Listen for change events
      changeStream.on("change", async (change) => {
        console.log("Change detected:", change);

        // Get the updated product from the database
        const product = await ProductModel.findById(change.documentKey._id);

        console.log("product:", product);
        // Emit data through socket
        io.emit("productBidders", product);
      });

      console.log("Listening for changes in products collection...");
    } catch (error) {
      console.error("Error setting up change stream:", error);
    }
  };

  // Initial setup
  setupChangeStream();

  // Reconnection handler
  io.on("connection", (socket) => {
    console.log("User connected");

    // Re-setup change stream if disconnected
    if (!changeStream) {
      setupChangeStream();
    }

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
