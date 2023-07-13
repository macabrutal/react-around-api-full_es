const bcrypt = require('bcryptjs'); // importando bcrypt
const jwt = require('jsonwebtoken'); // importando  jsonwebtoken
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env; // guardar las claves

// errors
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const ServerError = require('../errors/ServerError');

module.exports.getUser = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    })
    .then((users) => res.send({ data: users }))
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

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    })
    .then((user) => res.send({ data: user }))
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

//
module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    })
    .then((user) => res.send({ data: user }))
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

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  // 1.cálculo de hashes de la contraseña; acepta 2 parámetros: contraseña y 1 número ("salt").
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash, // 3.añadir el hash a la base de datos
    }))
    .then((user) => res.send({ data: user }))
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

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        ),
      });
    })
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

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    })
    .then((user) => res.send(req.params.id, { data: user }))
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

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    })
    .then((user) => res.send(req.params.id, { data: user }))
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
