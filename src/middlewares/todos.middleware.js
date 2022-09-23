const { TodoEntity } = require('../entities/todo.entity');
const { ErrorHandler } = require('./.error/error.handler');
const { ObjectId } = require('mongoose').Types;

const validadeMongoId = (req, res, next) => {
  // UseCase: By-ID, DELETE -> GET, DELETE
  try {
    const idParam = req.params.id;
    if (!ObjectId.isValid(idParam)) {
      throw new Error('Invalid ID parameter');
    }
    next();
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const validadeTodoId = (req, res, next) => {
  // UseCase: By-ID, DELETE -> GET, DELETE
  try {
    if (!TodoEntity.validateTodoId(req.params.id))
      throw { name: 'ValidationError', message: 'Invalid todo id' };

    next();
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const validadeBodyObject = (req, res, next) => {
  // UseCase: CREATE -> POST
  try {
    const todo = new TodoEntity(req.body);
    todo.validate();
    req.body = todo.getTodo();

    next();
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

const validadeBodyAndIdObject = (req, res, next) => {
  // UseCase: UPDATE -> PUT
  try {
    const todo = new TodoEntity(req.body);
    todo.validate();
    todo.todo_id = req.params.id;
    todo.validateId();
    req.body = todo.getTodo();
    // TODO already validated and with ID on req.body
    next();
  } catch (err) {
    ErrorHandler.handleError(err, req, res);
  }
};

module.exports = {
  validadeMongoId,
  validadeTodoId,
  validadeBodyObject,
  validadeBodyAndIdObject,
};
