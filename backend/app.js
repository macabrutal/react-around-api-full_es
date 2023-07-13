const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate'); // errores

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

app.use('/cards', cards);
app.use('/users', users);

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
});

// errores
// app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message = 'An error has ocurred on the server' } = err;
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {});
