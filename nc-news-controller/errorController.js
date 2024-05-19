const CustomError = require("../utils/customError");

module.exports = (error, req, res, next) => {
  console.log(error);
  if (
    error.code === "22P02" ||
    error.code === "23502" ||
    error.code === "42703"
  ) {
    const err = new CustomError("Bad request", 400);
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).send({ msg: err.message });
  } else if (error.code === "23503") {
    const err = new CustomError(`No user found for article_id`, 404);
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).send({ msg: err.message });
  } else {
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).send({ msg: error.message });
  }
};
