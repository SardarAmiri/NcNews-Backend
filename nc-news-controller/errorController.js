const CustomError = require("../utils/customError");

module.exports = (error, req, res, next) => {
    if(error.code === '22P02'){
        const err = new CustomError('Bad request', 400)
        err.statusCode = err.statusCode || 500;
        res.status(err.statusCode).send({msg: err.message})
    }else{
        error.statusCode = error.statusCode || 500;
        res.status(error.statusCode).send({msg: error.message})
    }
    
}