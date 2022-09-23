const paletasService = require('../services/todos.service');

const findAllPaletasController = async (req, res) => {
  try {
    const allPaletas = await paletasService.findAllPaletasService();
    res.send(allPaletas);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findByIdPaletaController = async (req, res) => {
  try {
    const idParam = req.params.id;
    const chosenPaleta = await paletasService.findByIdPaletaService(idParam);
    if (!chosenPaleta) {
      throw new Error('ID not found');
    }
    res.send(chosenPaleta);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const createPaletaController = async (req, res) => {
  try {
    const onePaleta = req.body;
    const newPaleta = await paletasService.createPaletaService(onePaleta);
    res.status(201).send(newPaleta);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updatePaletaController = async (req, res) => {
  try {
    const idParam = req.params.id;
    const editPaleta = req.body;
    const updatedPaleta = await paletasService.updatePaletaService(
      idParam,
      editPaleta,
    );
    res.send(updatedPaleta);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deletePaletaController = async (req, res) => {
  try {
    const idParam = req.params.id;
    const deletedPaleta = await paletasService.deletePaletaService(idParam);
    if (deletedPaleta === null || deletedPaleta === undefined) {
      throw new Error('ID not found!');
    }
    res.send({
      message: 'Successfully deleted Palette!',
      palette: deletedPaleta,
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  findAllPaletasController,
  findByIdPaletaController,
  createPaletaController,
  updatePaletaController,
  deletePaletaController,
};
