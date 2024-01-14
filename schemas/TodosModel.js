const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo_name: {
    type: String,
    required: true,
  },
  todo_complete: {
    type: Boolean,
    default: false,
  },
});

const todosSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  todos: {
    type: [todoSchema],
    default: [],
  },
});

const Todos = mongoose.model("Todos", todosSchema, "todos");

module.exports = { Todos };
