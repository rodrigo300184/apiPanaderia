


export function generateValidationMiddleware(schema) {
    const validationMiddleware = (req, res, next) => {
        const {error} = schema.validate(req.body,{abortEarly: false});
        if(error) 
            return res.status(400).json({error: true, message: error.message })
        next();
    }
    return validationMiddleware;
}