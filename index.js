const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const loginRouter = require("./routes/login");
const todoRouter = require("./routes/todo");
const alarmRouter = require("./routes/alarm");
const friendRouter = require("./routes/friend");
const cors = require("cors");

const app = express();
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 8080);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow CORS for all routes
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/login", loginRouter);
app.use("/todo", todoRouter);
app.use("/alarm", alarmRouter);
app.use("/friend", friendRouter);

app.get("/", (req, res) => {
  res.send("Hello, this is the index of the backend");
});

const { mongoDB } = require("./config/database");
mongoDB();

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
