const User = require('../models/user');

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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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
