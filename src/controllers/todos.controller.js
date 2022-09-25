const { ErrorHandler } = require('../middlewares/.error/error.handler');
const todosService = require('../services/todos.service');

const findAllTodosController = async (req, res) => {
  try {
    const allTodos = await todosService.findAllTodosService();
    res.send(allTodos);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const findByIdTodoController = async (req, res) => {
  try {
    const chosenTodo = await todosService.findByIdTodoService(req.params.id);
    if (!chosenTodo)
      throw { name: 'NotFoundError', message: 'Todo ID not found' };
    res.send(chosenTodo);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const createTodoController = async (req, res) => {
  try {
    const newPaleta = await todosService.createTodoService(req.body);
    if (!newPaleta)
      throw { name: 'InternalServerError', message: 'Todo not created' };
    res.status(201).send(newPaleta);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const updateTodoController = async (req, res) => {
  try {
    // req.body contains id -> via middleware
    const updatedTodo = await todosService.updateTodoService(req.body);
    if (!updatedTodo)
      throw { name: 'NotFoundError', message: 'Todo ID not found' };
    res.send(updatedTodo);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const deletedTodo = await todosService.deleteTodoService(req.params.id);
    if (deletedTodo === null)
      throw { name: 'NotFoundError', message: 'Todo ID not found' };
    res.send({
      message: 'Successfully deleted Todo!',
      palette: deletedTodo,
    });
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

module.exports = {
  findAllTodosController,
  findByIdTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
