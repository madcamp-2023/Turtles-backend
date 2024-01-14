const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Friends } = require("../schemas/FriendModel");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("request on friend");
  next();
});

router.get("/", async function (req, res) {
  try {
    const requestUid = req.body.uid;

    // invalid uid
    if (!requestUid) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' parameter.",
      });
    }

    const friendList = await Friends.findOne({ uid: requestUid });

    // friend data not exist
    if (!frinedList) {
      const initFriend = new Friends({
        uid: requestUid,
        friends: [],
      });
      const savedFriend = await initFriend.save();
      return res.status(200).json({ success: true, friend: savedFriend });
    }
    res.status(200).json({ success: true, friend: friendList });
  } catch (error) {
    console.error("Error in GET request for friends:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/", async function (req, res) {
  try {
    const { uid, loginOfFriend } = req.body;

    const friendUser = await User.findOne({ login: loginOfFriend });

    if (!friendUser) {
      return res.status(404).json({
        success: false,
        message: "Friend not found",
      });
    }

    // Update the Friends collection where uid matches and add uidOfFriend to the friends array
    const result = await Friends.updateOne(
      { uid: uid },
      { $addToSet: { friends: friendUser._id } }
    );

    // Check the result to see if any document was modified
    if (result.nModified === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Friend added successfully" });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found or friend already exists",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
