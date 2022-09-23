
const route = require('express').Router();
const controllerPaletas = require('../controllers/todos.controller');
const {
  validadeId,
  validadeBodyObject,
} = require('../middlewares/todos.middleware');



/* GET ALL */
route.get('/find-all', controllerPaletas.findAllPaletasController);
/* GET BY ID */
route.get(
  '/paleta-id/:id',
  validadeId,
  controllerPaletas.findByIdPaletaController,
);
/* CREATE PALETA */
route.post(
  '/create',
  validadeBodyObject,
  controllerPaletas.createPaletaController,
);
/* UPDATE BY ID */
route.put(
  '/update/:id',
  validadeId,
  validadeBodyObject,
  controllerPaletas.updatePaletaController,
);
/* DELETE BY ID */
route.delete(
  '/delete/:id',
  validadeId,
  controllerPaletas.deletePaletaController,
);

module.exports = route;
