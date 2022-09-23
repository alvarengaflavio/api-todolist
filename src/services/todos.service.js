// const db = require('../../mocks/paletas');
// const paletas = db.paletas;

const Paletas = require('../models/Todo');

const findAllPaletasService = async () => {
  const allPaletas = await Paletas.find();
  return allPaletas;
};

const findByIdPaletaService = async (id) => {
  const byIdPaleta = await Paletas.findById(id);
  return byIdPaleta;
};

const createPaletaService = async (newPaleta) => {
  const createdPaleta = await Paletas.create(newPaleta);
  return createdPaleta;
};

const updatePaletaService = async (id, editedPaleta) => {
  /* The default value for the new option of findByIdAndUpdate/findOneAndUpdate has changed to false, which means returning the old doc. So you need to explicitly set the option to true to get the new version of the doc, after the update is applied */
  const updatedPaleta = await Paletas.findByIdAndUpdate(id, editedPaleta, {
    new: true,
  });
  return updatedPaleta;
};

const deletePaletaService = async (id) => {
  const deletedPaleta = await Paletas.findByIdAndDelete(id);
  return deletedPaleta;
  // return await Paletas.findByIdAndDelete(id);
};

module.exports = {
  findAllPaletasService,
  findByIdPaletaService,
  createPaletaService,
  updatePaletaService,
  deletePaletaService,
};
