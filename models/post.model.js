const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: { type: String, enum: ["PC", "MOBILE", "TABLET"] }
});

const Post = mongoose.model("post", postSchema);

module.exports = { Post };