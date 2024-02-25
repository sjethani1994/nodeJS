const ProductModel = require("../models/product.model");

module.exports = async (io) => {
  let changeStream;

  const setupChangeStream = () => {
    try {
      // Only set up the change stream if it's not already set up
      if (!changeStream) {
        changeStream = ProductModel.watch();

        changeStream.on("change", async (change) => {
          console.log("Change detected:", change);

          try {
            // Get the updated product from the database
            const product = await ProductModel.findById(change.documentKey._id);

            // Update isActive flag based on current date
            const currentDate = new Date();
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

            // Emit data through socket
            io.emit("productBidders", product);
          } catch (error) {
            console.error(
              "Error updating product or emitting socket data:",
              error
            );
          }
        });

        console.log("Listening for changes in products collection...");
      }
    } catch (error) {
      console.error("Error setting up change stream:", error);
      // Retry setup after a delay if an error occurs
      setTimeout(setupChangeStream, 5000); // Retry after 5 seconds
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
