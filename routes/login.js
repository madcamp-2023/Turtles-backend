const express = require("express");
const axios = require("axios");
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("request on login");
  next();
});

router.get("/", function (req, res) {
  res.send("GET for login");
});

router.post("/", async function (req, res) {
  const requestToken = req.body.code;
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  await axios({
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
  })
    .then((tokenResponse) => {
      const accessToken = tokenResponse.data.access_token; // github api에서 보내주는 엑세스토큰
      console.log(`access_token: ${accessToken}`);

      // Now that we have the accessToken, make the next axios call
      return axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use 'Bearer' and space before the token
        },
      });
    })
    .then((userInfoResponse) => {
      const { login, id, name, html_url } = userInfoResponse.data;
      console.log(`login: ${login}, name: ${name}`);
      // save data
      res.send({ login: login, name: name });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
