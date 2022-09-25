const Todos = require('../models/Todo');

const findAllTodosService = async () => {
  const allTodos = await Todos.find();
  return allTodos.map((item) => ({
    id: item.todo_id,
    todo: item.todo,
    completed: item.completed,
    created_at: item.created_at,
    completed_at: item.completed_at ? item.completed_at : null,
  }));
};

const findByIdTodoService = async (id) => {
  const byIdTodo = await Todos.findOne({ todo_id: id });
  if (byIdTodo === null) return null;
  return {
    id: byIdTodo.todo_id,
    todo: byIdTodo.todo,
    completed: byIdTodo.completed,
    created_at: byIdTodo.created_at,
    completed_at: byIdTodo.completed_at ? byIdTodo.completed_at : null,
  };
};

const createTodoService = async (newTodo) => {
  const todoList = await findAllTodosService();
  const newTodoId = findFreeId(todoList);
  newTodo.todo_id = newTodoId;
  const createdTodo = await Todos.create(newTodo);
  return {
    id: createdTodo.todo_id,
    todo: createdTodo.todo,
    completed: createdTodo.completed,
    created_at: createdTodo.created_at,
    completed_at: createdTodo.completed_at ? createdTodo.completed_at : null,
  };
};

const updateTodoService = async (editedTodo) => {
  /* The default value for the new option of findByIdAndUpdate/findOneAndUpdate has changed to false, which means returning the old doc. So you need to explicitly set the option to true to get the new version of the doc, after the update is applied */
  const oldTodo = await Todos.findOne({ todo_id: editedTodo.id });
  if (oldTodo === null) return null;

  oldTodo.todo = editedTodo.todo;
  oldTodo.completed = editedTodo.completed;
  oldTodo.created_at = editedTodo.created_at;
  oldTodo.completed_at = editedTodo.completed_at;
  await oldTodo.save();

  return {
    id: oldTodo.todo_id,
    todo: oldTodo.todo,
    completed: oldTodo.completed,
    created_at: oldTodo.created_at,
    completed_at: oldTodo.completed_at ? oldTodo.completed_at : null,
  };
};

const deleteTodoService = async (id) => {
  const selectTodo = await Todos.findOne({ todo_id: id });
  if (!selectTodo) return null;

  const deletedTodo = await Todos.findByIdAndDelete(selectTodo.id);
  return deletedTodo;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const findFreeId = (list) => {
  const sortedById = listSortedById(list);
  let previousId = 0;

  for (const item of sortedById) {
    if (item.id !== previousId + 1) {
      return previousId + 1;
    }
    previousId = item.id;
  }

  return previousId + 1;
};

const listSortedById = (list) => {
  return list.slice().sort((a, b) => a.id - b.id);
};

const sortedTodoList = (todoList) => {
  todoList.sort((a, b) => a.completed - b.completed || a.id - b.id);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  findAllTodosService,
  findByIdTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
};
