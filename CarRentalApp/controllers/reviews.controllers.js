const reviewModel = require("../models/reviewSchema.model");

const addReviews = async (req, res) => {
  //review msg, userid,productid;
  try {
    const { commentMsg, userId, productId } = req.body;

    const createdComment = await reviewModel.create({
      commentMsg,
      userId,
      productId,
    });

    res.status(200).json({
      message: "Comments created.",
      createdComment,
    });
  } catch (error) {
    console.log(error.message, "from review api");
    res.status(404).json({
      message: error.message,
    });
  }
};

// API endpoint to get all comments;
const getReviews = async (req, res) => {
  try {
    const allReviews = await reviewModel
      .find()
      .populate("userId")
      .populate("productId");
    res.status(200).json({
      message: "all Reviews",
      allReviews,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    // Extract review ID from request parameters and review details from request body
    const { id } = req.params;
    const { commentMsg, productId, userId } = req.body;

    // Update the review and get the updated document
    const updateReview = await reviewModel.findByIdAndUpdate(
      id,
      { commentMsg, productId, userId },
      { new: true }
    );

    // Check if the review was found and updated
    if (!updatedComment) {
      return res.status(404).json({
        message: "review not found or could not be updated",
      });
    }

    // Respond with the updated review
    res.status(200).json({
      message: "review updated successfully",
      updatedComment,
    });
  } catch (error) {
    console.error("Error during review update:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getReviews,
  addReviews,
  updateReview,
};
