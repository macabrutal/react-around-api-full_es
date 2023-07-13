const express = require('express');
const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');// importar los loggers

const auth = require('./middlewares/auth'); // 1.importar auth
const cards = require('./routes/cards');
const users = require('./routes/users');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

// require('dotenv').config();

const app = express();

// Rutas proyegidas:
app.use(auth); // 2.autorización de auth
app.use('/cards', cards); // 3A.esta rutas necesitan auth
app.use('/users', users); // 3B.esta rutas necesitan auth

app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/aroundb');
mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(requestLogger);// habilitar el logger de solicitud 1ero

//ELIMINAR DESPUES
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});


app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),

}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);
app.use('/cards', cards);
app.use('/users', users);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
});

app.use(errorLogger); // habilitar el logger de errores ANTES de los controladores de errores

// errores
app.use(errors());// controlador de errores de celebrate

app.use((err, req, res) => {
  const { statusCode = 500, message = 'An error has ocurred on the server' } = err;
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {});
