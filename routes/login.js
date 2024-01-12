var express = require("express");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("request on login");
  next();
});
// define the home page route
router.get("/", function (req, res) {
  res.send("GET for login");
});
module.exports = router;
