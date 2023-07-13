const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const BadRequest = require('../errors/BadRequest');
const ServerError = require('../errors/ServerError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('Card no encontrada');
    })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// Proyecto 16: Comprobar los derechos de los usuarios con req.user._id

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      let err;
      if (error.status === 401) {
        err = new AuthError('No autorizado');
      } else if (error.status === 400) {
        err = new BadRequest('Datos inválidos');
      } else {
        err = new ServerError('Error del servidor');
      }

      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Card no encontrada');
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      let err;
      if (error.status === 401) {
        err = new AuthError('No autorizado');
      } else if (error.status === 400) {
        err = new BadRequest('Datos inválidos');
      } else {
        err = new ServerError('Error del servidor');
      }

      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card no encontrada');
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      let err;
      if (error.status === 401) {
        err = new AuthError('No autorizado');
      } else if (error.status === 400) {
        err = new BadRequest('Datos inválidos');
      } else {
        err = new ServerError('Error del servidor');
      }

      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card no encontrada');
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      let err;
      if (error.status === 401) {
        err = new AuthError('No autorizado');
      } else if (error.status === 400) {
        err = new BadRequest('Datos inválidos');
      } else {
        err = new ServerError('Error del servidor');
      }

      next(err);
    });
};
