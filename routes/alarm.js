const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Alarm } = require("../schemas/AlarmModel");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("request on alarm");
  next();
});

router.get("/", async function (req, res) {
  // req.query: {uid: string}
  try {
    const requestUid = req.query.uid;

    if (!requestUid) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' parameter.",
      });
    }

    const existingAlarm = await Alarm.findOne({ uid: requestUid });

    if (!existingAlarm) {
      const initAlarm = new Alarm({
        uid: requestUid,
        alarm_stretch: true,
        alarm_walk: true,
        alarm_water: true,
        alarm_eye: true,
      });
      const savedAlarm = await initAlarm.save();
      return res.status(200).json({ success: true, alarms: savedAlarm });
    }

    res.status(200).json({ success: true, alarms: existingAlarm });
  } catch (error) {
    console.error("Error in GET request for alarm:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/", async function (req, res) {
  // req.body: {uid: string, alarm_stretch: boolean, alarm_walk: boolean, alarm_water: boolean, alarm_eye: boolean}
  try {
    const requestUid = req.body.uid;

    if (!requestUid) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' parameter.",
      });
    }

    const existingAlarm = await Alarm.findOne({ uid: requestUid });

    if (!existingAlarm) {
      return res
        .status(404)
        .json({ success: false, message: "Alarm not found" });
    }

    await Alarm.updateOne(
      { uid: requestUid },
      {
        $set: {
          alarm_stretch: req.body.alarm_stretch,
          alarm_walk: req.body.alarm_walk,
          alarm_water: req.body.alarm_water,
          alarm_eye: req.body.alarm_eye,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Alarm modified successfully" });
  } catch (error) {
    console.error("Error in POST request for alarm:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
