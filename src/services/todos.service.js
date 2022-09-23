const Todos = require('../models/Todo');

const findAllTodosService = async () => {
  const allTodos = await Todos.find();
  return allTodos.map((item) => ({
    id: item.todo_id,
    todo: item.todo,
    completed: item.completed,
    created_at: item.created_at,
    completed_at: item.completed,
  }));
};

const findByIdTodoService = async (id) => {
  const byIdPaleta = await Todos.findOne({ todo_id: id });
  if (byIdPaleta === null) return null;
  console.log(byIdPaleta);
  return {
    id: byIdPaleta.todo_id,
    todo: byIdPaleta.todo,
    completed: byIdPaleta.completed,
    created_at: byIdPaleta.created_at,
    completed_at: byIdPaleta.completed,
  };
};

const createTodoService = async (newTodo) => {
  const todoList = await findAllTodosService();
  const newTodoId = findFreeId(todoList);
  newTodo.todo_id = newTodoId;
  const createdPaleta = await Todos.create(newTodo);
  return {
    id: createdPaleta.todo_id,
    todo: createdPaleta.todo,
    completed: createdPaleta.completed,
    created_at: createdPaleta.created_at,
    completed_at: createdPaleta.completed,
  };
};

const updateTodoService = async (id, editedTodo) => {
  /* The default value for the new option of findByIdAndUpdate/findOneAndUpdate has changed to false, which means returning the old doc. So you need to explicitly set the option to true to get the new version of the doc, after the update is applied */
  const updatedTodo = await Todos.findByIdAndUpdate(id, editedTodo, {
    new: true,
  });
  return updatedTodo;
};

const deleteTodoService = async (id) => {
  const deletedPaleta = await Todos.findByIdAndDelete(id);
  return deletedPaleta;
  // return await Paletas.findByIdAndDelete(id);
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
