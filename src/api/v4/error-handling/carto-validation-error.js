var CartoError = require('./carto-error');

/**
 * Build a cartoError related to validation errors.
 * @constructor
 * 
 * @return {CartoError} A well formed object representing the error.
 *
 * @api
 */
function CartoValidationError (type, message, opts) {
  return new CartoError({
    origin: 'validation',
    type: type,
    message: message
  }, opts);
}

module.exports = CartoValidationError;