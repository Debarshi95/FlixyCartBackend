const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, _, res, next) => {
  console.error(error);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: 'Malformatted ID.' });
  }
  if (error.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: 'Invalid token.' });
  }
  res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });

  return next(error);
};

module.exports = { errorHandler };
