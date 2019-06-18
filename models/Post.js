const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String
  },
  reviewSubject: {
    type: String
  },
  reviewPreview: {
    type: String
  },
  fullReview: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
