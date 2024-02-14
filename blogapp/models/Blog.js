const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String},
    content: { type: String},
    avatar: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
