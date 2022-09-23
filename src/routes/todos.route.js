const route = require('express').Router();
const controllerPaletas = require('../controllers/todos.controller');
const {
  validadeTodoId,
  validadeBodyObject,
  validadeBodyAndIdObject,
} = require('../middlewares/todos.middleware');

/* GET ALL */
route.get('/find-all', controllerPaletas.findAllPaletasController);
/* GET BY ID */
route.get(
  '/todo-id/:id',
  validadeTodoId,
  controllerPaletas.findByIdPaletaController,
);
/* CREATE TODO */
route.post(
  '/create',
  validadeBodyObject,
  controllerPaletas.createPaletaController,
);
/* UPDATE BY ID */
route.put(
  '/update/:id',
  validadeBodyAndIdObject,
  controllerPaletas.updatePaletaController,
);
/* DELETE BY ID */
route.delete(
  '/delete/:id',
  validadeTodoId,
  controllerPaletas.deletePaletaController,
);

module.exports = route;
