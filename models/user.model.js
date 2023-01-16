const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String
});

const User = mongoose.model("user", userSchema);

module.exports = { User };