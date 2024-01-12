require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const loginRouter = require("./routes/login");
const todoRouter = require("./routes/todo");

const app = express();
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/login", loginRouter);
app.use("/todo", todoRouter);

const { mongoDB } = require("./config/database");
mongoDB();

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
