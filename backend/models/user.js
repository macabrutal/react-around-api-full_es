// El email de cada usuario debe ser único y validarse con el esquema de correo electrónico (validator)

const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+$/.test(v);
      },
      message: 'No es una URL valida',
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },

});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password') // el hash de la contraseña se incluirá en el objeto user.
    .then((user) => {
      // no encontrado - se rechaza el promise
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      // encontrado - comparando hashes
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user; // ahora user está disponible
        });
    });
};

module.exports = mongoose.model('user', userSchema);
