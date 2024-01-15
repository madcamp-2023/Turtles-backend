const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Todos } = require("../schemas/TodosModel");

router.use(function timeLog(req, res, next) {
  console.log("request on todo");
  next();
});

router.get("/", async function (req, res) {
  // req.body: {uid: string, date: string("YYYY-MM-DD")}
  try {
    const requestUid = req.query.uid;
    const requestDate = req.query.date;

    if (!requestUid || !requestDate) {
      return res.status(400).json({
        success: false,
        error: "Invalid request. Missing 'uid' parameter.",
      });
    }

    const existingTodos = await Todos.findOne({
      uid: requestUid,
      date: requestDate,
    });

    if (!existingTodos) {
      const initTodos = new Todos({
        uid: requestUid,
        date: requestDate,
        todos: [],
      });
      const savedTodos = await initTodos.save();
      return res.status(200).json({ success: true, todos: savedTodos });
    }

    const todos = existingTodos.todos.map((todo) => {
      return {
        todo_name: todo.todo_name,
        todo_complete: todo.todo_complete,
      };
    });

    res.status(200).json({ success: true, todos: todos });
  } catch (error) {
    console.error("Error in GET request for todos:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/", async function (req, res) {
  // req.body: {uid: string, date: string("YYYY-MM-DD") todos: [{todo_name: string, todo_complete: boolean, todo_icon: string}]}
  try {
    const requestUid = req.body.uid;
    const requestDate = req.body.date;
    const requestTodos = req.body.todos;

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
      const initTodos = new Todos({
        uid: requestUid,
        date: requestDate,
        todos: todos,
      });
      const savedTodos = await initTodos.save();
      return res.status(200).json({ success: true, todos: savedTodos });
    }

    await Todos.updateOne(
      { uid: requestUid },
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
