const { CustomError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof CustomError){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({err:err.message})
}


module.exports = errorHandlerMiddleware