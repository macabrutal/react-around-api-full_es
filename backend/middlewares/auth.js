const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const handleAuthError = () => {
  throw new AuthError('No autorizado');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // añadir el payload al objeto Request

  next(); // pasar la solicitud más adelante
  return null; // para asegurarte de que siempre se devuelva un valor.
};
