const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  todo_id: { type: Number, required: true, immutable: true },
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false },
  created_at: { type: String, required: true },
  completed_at: { type: String || null, default: null },
});

const Todo = model('todos', TodoSchema);

module.exports = Todo;
