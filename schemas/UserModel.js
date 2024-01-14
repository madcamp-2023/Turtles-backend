const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
  },
  uid: {
    type: String,
  },
  name: {
    type: String,
  },
  github_url: {
    type: String,
  },
  profile_img: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = { User };
