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
    const idParam = req.params.id;
    const chosenTodo = await todosService.findByIdTodoService(idParam);
    if (!chosenTodo) {
      throw new Error('ID not found');
    }
    res.send(chosenTodo);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const createTodoController = async (req, res) => {
  try {
    // req.body contains id -> via middleware
    const newPaleta = await todosService.createTodoService(req.body);
    res.status(201).send(newPaleta);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const updateTodoController = async (req, res) => {
  try {
    const idParam = req.params.id;
    const editPaleta = req.body;
    const updatedPaleta = await todosService.updateTodoService(
      idParam,
      editPaleta,
    );
    res.send(updatedPaleta);
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const idParam = req.params.id;
    const deletedTodo = await todosService.deleteTodoService(idParam);
    if (deletedTodo === null || deletedTodo === undefined) {
      throw new Error('ID not found!');
    }
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
