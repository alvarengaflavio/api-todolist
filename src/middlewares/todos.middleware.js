const mongoose = require('mongoose');

const validadeId = (req, res, next) => {
  try {
    const idParam = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(idParam)) {
      throw new Error('Invalid ID parameter');
    }
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const validadeBodyObject = (req, res, next) => {
  try {
    const editPaleta = req.body;
    if (
      !editPaleta ||
      !editPaleta.sabor ||
      !editPaleta.descricao ||
      !editPaleta.foto ||
      !editPaleta.preco
    ) {
      throw new Error('Invalid Paleta Json body');
    }
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  validadeId,
  validadeBodyObject,
};
