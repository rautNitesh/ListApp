const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  userPhoto: {
    type: String,
  },
  photo: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = (module.exports = mongoose.model("posts", PostSchema));
