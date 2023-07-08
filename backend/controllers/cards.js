const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send({ data: cards }))
    .catch((error) => {
      if (error.status === 404) {
        return res.status(404).send({ message: 'Cards no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para crear una tarjeta' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'Cards no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para eliminar una tarjeta' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'Cards no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para modificar una tarjeta' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'Cards no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para modificar una tarjeta' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'Cards no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};
