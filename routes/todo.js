const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Todos } = require("../schemas/TodosModel");

// router.use(function timeLog(req, res, next) {
//   console.log("request on todo");
//   next();
// });

const moment = require("moment");

router.get("/", async function (req, res) {
  console.log("GET to /todo");
  try {
    const requestUid = req.query.uid;
    const requestDate = req.query.date;
    console.log(`requestUid: ${requestUid}, requestDate: ${requestDate}`);

    if (!requestUid || !requestDate) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' or 'date' parameter.",
      });
    }

    // Validate date format using moment.js
    const isValidDate = moment(requestDate, "YYYY-MM", true).isValid();
    if (!isValidDate) {
      return res.status(400).json({
        success: false,
        error:
          "Invalid date format. Please provide a valid 'YYYY-MM' formatted date.",
      });
    }

    // Parse the date using moment.js
    const startDate = moment(requestDate, "YYYY-MM").toDate();
    const endDate = moment(requestDate, "YYYY-MM").add(1, "months").toDate();

    // Find all todos within the date range
    const results = await Todos.find({
      uid: requestUid,
      date: { $gte: startDate, $lt: endDate },
    });

    res.status(200).json({ success: true, todos: results });
  } catch (error) {
    console.error("Error in GET request for todos:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/", async function (req, res) {
  // req.body: {uid: string, date: string("YYYY-MM-DD") todos: [{todo_name: string, todo_complete: boolean, todo_icon: string}]}
  console.log("POST to /todo");

  try {
    const requestUid = req.body.uid;
    const requestDate = req.body.date;
    const requestTodos = req.body.todos;

    console.log(req.body);

    if (!requestUid || !requestDate || !requestTodos) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' or 'todos' parameter.",
      });
    }

    const todos = requestTodos.map((todo) => {
      return {
        todo_name: todo.todo_name,
        todo_complete: todo.todo_complete,
        todo_icon: todo.todo_icon,
      };
    });

    const existingTodos = await Todos.findOne({
      uid: requestUid,
      date: requestDate,
    });

    if (!existingTodos) {
      // handle new todo
      const initTodos = new Todos({
        uid: requestUid,
        date: requestDate,
        todos: todos,
      });
      const savedTodos = await initTodos.save();
      return res.status(200).json({ success: true, todos: savedTodos });
    }
    // handle existing todo
    await Todos.updateOne(
      { uid: requestUid, date: requestDate },
      {
        $set: { todos: todos },
      }
    );

    res.status(200).json({ success: true, todos: todos });
  } catch (error) {
    console.error("Error in POST request for todos:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
