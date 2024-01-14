const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  alarm_stretch: {
    type: Boolean,
  },
  alarm_walk: {
    type: Boolean,
  },
  alarm_water: {
    type: Boolean,
  },
  alarm_eye: {
    type: Boolean,
  },
});

const Alarm = mongoose.model("Alarm", alarmSchema, "alarms");

module.exports = { Alarm };
