// 1.importar 2 módulos :
const winston = require('winston');
const expressWinston = require('express-winston');

// 2.crea un logger de solicitud
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// 3.logger de errores
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// 4.exportar loggers:
module.exports = {
  requestLogger,
  errorLogger,
};
