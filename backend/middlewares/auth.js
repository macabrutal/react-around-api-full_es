// verificar el token de los encabezados.
// Si todo está bien con el token, el middleware debería añadir el payload del token al objeto user y llamar a next()
// Si algo está mal con el token, el middleware debería devolver un error 401.

const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Error de autorización' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // añadir el payload al objeto Request

  next(); // pasar la solicitud más adelante
};
