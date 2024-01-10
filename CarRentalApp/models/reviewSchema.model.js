const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema({
  commentMsg: {
    type: String,
    required: true,
  },
  userId: {
    //referencing
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDetails",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carListings",
    required: true,
  },
});

const reviewModel = mongoose.model("reviews", reviewSchema);
module.exports = reviewModel;
