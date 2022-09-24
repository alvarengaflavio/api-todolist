const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  todo_id: { type: Number, required: true, immutable: true, unique: true },
  todo: { type: String, required: true, minLength: 8, maxLength: 60 },
  completed: { type: Boolean, default: false },
  created_at: { type: String, required: true },
  completed_at: { type: Schema.Types.Mixed, required: true },
});

const Todo = model('todos', TodoSchema);

module.exports = Todo;
