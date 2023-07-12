// 1.el controlador createUser debe añadir los campos email y password
// 2.Asegúrate de que se haya calculado el hash de las contraseñas antes de guardarlas en la base de datos
// 3.que los campos name, about y avatar sean opcionales (no hay un método required())

// 4.Para los valores predeterminados, añade
// name — "Jacques Cousteau";
// about — "Explorador";
// avatar — enlace;

const bcrypt = require('bcryptjs'); 		// importando bcrypt
const jwt = require('jsonwebtoken');		// importando  jsonwebtoken
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env; // guardar las claves

module.exports.getUser = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.status === 404) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.status === 404) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

//
module.exports.getUserProfile = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.status === 404) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  // 1.cálculo de hashes de la contraseña; acepta 2 parámetros: contraseña y 1 número ("salt").
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash, 		// 3.añadir el hash a la base de datos
    }))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'No se encontraron usuarios' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.login = (req, res) => {
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
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail()
    .then((user) => res.send(req.params.id, { data: user }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'No se encontraron usuarios' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.send(req.params.id, { data: user }))
    .catch((error) => {
      if (error.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Datos inválidos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario' });
      } if (error.status === 404) {
        return res.status(404).send({ message: 'No se encontraron usuarios' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};
