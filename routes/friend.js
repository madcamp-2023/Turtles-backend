const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Friends } = require("../schemas/FriendModel");
const { User } = require("../schemas/UserModel");

router.get("/", async function (req, res) {
  // req.body: {uid: string}
  try {
    const requestUid = req.query.uid;
    console.log(requestUid);

    // Invalid uid
    if (!requestUid) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' parameter.",
      });
    }

    let friendList = await Friends.findOne({ uid: requestUid });

    // If friend data does not exist, create a new Friends document
    if (!friendList) {
      const initFriend = new Friends({
        uid: requestUid,
        friends: [],
      });
      friendList = await initFriend.save();
    }

    // Populate 'friends' array with 'uid' values from 'User' model
    const populatedFriends = await Friends.populate(friendList, {
      path: "friends",
      select: "github_id name uid profile_img bio", // Include 'github_id', 'name', and 'uid' fields from 'User'
    });

    res.status(200).json({ success: true, friends: populatedFriends.friends });
  } catch (error) {
    console.error("Error in GET request for friends:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/", async function (req, res) {
  try {
    const { uid, idOfFriend: idOfFriend } = req.body;

    if (!uid || !idOfFriend) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' or 'idOfFriend' parameter.",
      });
    }

    const follower = await User.findOne({ uid: uid });
    const following = await User.findOne({ github_id: idOfFriend });

    if (!follower) {
      return res.status(404).json({
        success: false,
        message: "follower not found",
      });
    }
    if (!following) {
      return res.status(404).json({
        success: false,
        message: "friend not found",
      });
    }

    // Update the Friends collection where uid matches and add uidOfFriend to the friends array
    const existingUser = await Friends.findOne({ uid: uid });
    if (!existingUser) {
      const newUser = new Friends({
        uid: uid,
        friends: [following._id],
      });
      const savedUser = await newUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Friend added successfully" });
    }

    const result = await Friends.updateOne(
      { uid: uid },
      { $addToSet: { friends: following._id } }
    );

    // Check the result to see if any document was modified
    console.log(result.nModified);
    if (result.nModified !== undefined && result.nModified === 1) {
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
