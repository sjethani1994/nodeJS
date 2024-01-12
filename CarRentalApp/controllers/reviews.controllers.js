const reviewModel = require("../models/reviewSchema.model");

const addReviews = async (req, res) => {
  //review msg, userid,carId;
  try {
    const { reviewMsg, userId, carId } = req.body;

    const createdReview = await reviewModel.create({
      reviewMsg,
      userId,
      carId,
    });

    res.status(200).json({
      message: "Reviews created.",
      createdReview,
    });
  } catch (error) {
    console.log(error.message, "from review api");
    res.status(404).json({
      message: error.message,
    });
  }
};

// API endpoint to get all Reviews;
const getReviews = async (req, res) => {
  try {
    const allReviews = await reviewModel
      .find()
      .populate("userId")
      .populate("carId");
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
    const { reviewMsg, carId, userId } = req.body;

    // Update the review and get the updated document
    const updatedreview = await reviewModel.findByIdAndUpdate(
      id,
      { reviewMsg, carId, userId },
      { new: true }
    );

    // Check if the review was found and updated
    if (!updatedreview) {
      return res.status(404).json({
        message: "review not found or could not be updated",
      });
    }

    // Respond with the updated review
    res.status(200).json({
      message: "review updated successfully",
      updatedreview,
    });
  } catch (error) {
    console.error("Error during review update:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    // Extract review ID from request parameters.
    const { id } = req.params;

    // delete the review and get the deleted document
    const deletedreview = await reviewModel.findByIdAndDelete(id);

    // Check if the review was found and deleted
    if (!deletedreview) {
      return res.status(404).json({
        message: "review not found or could not be deleted",
      });
    }

    // Respond with the deleted review
    res.status(200).json({
      message: "review deleted successfully",
      updatedreview,
    });
  } catch (error) {
    console.error("Error during review deleting:", error);
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
  deleteReview,
};
