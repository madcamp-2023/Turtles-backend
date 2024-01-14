const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  freinds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Friends = mongoose.model("Friends", friendSchema, "friends");

module.exports = { Friends };
