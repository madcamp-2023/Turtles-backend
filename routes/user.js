const express = require("express");
const router = express.Router();
const { User } = require("../schemas/UserModel");

router.post("/", async function (req, res) {
  // req.body: {uid: string, bio: string}
  try {
    const requestUid = req.body.uid;
    const requestBio = req.body.bio;

    if (!requestUid || !requestBio) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' or 'bio' parameter.",
      });
    }

    const existingUser = await User.findOne({ uid: requestUid });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.updateOne(
      { uid: requestUid },
      {
        $set: {
          bio: requestBio,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "User's bio modified successfully" });
  } catch (error) {
    console.error("Error in POST request for user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
