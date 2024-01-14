const express = require("express");
const axios = require("axios");
const router = express.Router();
const { User } = require("../schemas/UserModel");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("request on login");
  next();
});

router.post("/", async function (req, res) {
  try {
    const requestToken = req.body.code;
    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const tokenResponse = await axios({
      method: "POST",
      url: `https://github.com/login/oauth/access_token`,
      headers: {
        accept: "application/json",
      },
      data: {
        client_id: clientID,
        client_secret: clientSecret,
        code: requestToken,
      },
    });

    const accessToken = tokenResponse.data.access_token;
    const userInfoResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { login, id, name, html_url, avatar_url } = userInfoResponse.data;

    // Check if the user already exists
    const existingUser = await User.findOne({ uid: id });

    // For existing user
    if (existingUser) {
      console.log("Existing user");
      return res.status(200).json({ success: true, user: existingUser });
    }

    // For new user
    const newUser = new User({
      login,
      uid: id,
      name,
      github_url: html_url,
      profile_img: avatar_url,
    });

    const savedUser = await newUser.save();
    console.log("New user");
    res.status(200).json({ success: true, userInfo: savedUser });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
