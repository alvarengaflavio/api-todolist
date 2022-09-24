const route = require('express').Router();
const controllerTodos = require('../controllers/todos.controller');
const {
  validadeTodoId,
  validadeBodyObject,
  validadeBodyAndIdObject,
} = require('../middlewares/todos.middleware');

/* GET ALL */
route.get('/find-all', controllerTodos.findAllTodosController);
/* GET BY ID */
route.get('/todo/:id', validadeTodoId, controllerTodos.findByIdTodoController);
/* CREATE TODO */
route.post('/create', validadeBodyObject, controllerTodos.createTodoController);
/* UPDATE BY ID */
route.put(
  '/update/:id',
  validadeBodyAndIdObject,
  controllerTodos.updateTodoController,
);
/* DELETE BY ID */
route.delete(
  '/delete/:id',
  validadeTodoId,
  controllerTodos.deleteTodoController,
);

module.exports = route;
