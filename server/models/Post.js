const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    postinfo: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    postimage: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
