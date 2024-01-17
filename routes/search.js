const express = require("express");
const router = express.Router();
const { User } = require("../schemas/UserModel");

router.post("/", async function (req, res) {
  // req.body: { github_id: string, uid: string }
  try {
    const githubId = req.body.github_id;
    const myUid = req.body.uid;

    // Check if the request contains the 'github_id' parameter
    if (!githubId) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'github_id' parameter.",
      });
    }

    // Find the user with the provided 'github_id'
    const user = await User.find({ github_id: githubId, uid: { $ne: myUid } });

    // Send the user data in the response
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error("Error in POST request for search:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
