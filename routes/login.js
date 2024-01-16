const express = require("express");
const axios = require("axios");
const router = express.Router();
const { User } = require("../schemas/UserModel");

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

    let userResponse;

    // For existing user
    if (existingUser) {
      await User.updateOne(
        { uid: id },
        {
          $set: {
            github_id: login,
            name: name,
            github_url: html_url,
            profile_img: avatar_url,
          },
        }
      );

      userResponse = existingUser;
    } else {
      // For new user
      const newUser = new User({
        github_id: login,
        uid: id,
        name,
        github_url: html_url,
        profile_img: avatar_url,
        bio: "",
      });

      const savedUser = await newUser.save();
      console.log(savedUser);
      userResponse = savedUser;
    }
    res.status(200).json({ success: true, userInfo: userResponse });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
