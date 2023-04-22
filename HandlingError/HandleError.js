import createError from "http-errors";
/**
 * Crearte an Error Object and Catch 404 then forward to error handler
 * @param {*} next
 */
export function handle404Error(req, res, next) {
  next(createError(404));
}
/**
 * The Error Handler
 * @param {*} err
 * @param {*} res
 */
export function handleErrors(err, req, res, next) {
  let statusCode, message;

  if (err.name === "ValidationError") {
    // Handle Mongoose validation errors
    statusCode = 400;
    message = err.message;
  } else if (err.name === "NotFoundError") {
    // Handle 404 errors
    statusCode = 404;
    message = err.message;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = err.message;
  } else {
    // Handle all other errors
    statusCode = err.status || 500;
    message = err.message || "Server error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}
