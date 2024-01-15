const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Friends = mongoose.model("Friends", friendSchema, "friends");

module.exports = { Friends };
