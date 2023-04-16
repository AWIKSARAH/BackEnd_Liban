
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
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
    anotherMessage:"gg"
  });
  console.log(err);
}

