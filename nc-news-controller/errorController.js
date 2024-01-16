module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).send({msg: error.message})
}