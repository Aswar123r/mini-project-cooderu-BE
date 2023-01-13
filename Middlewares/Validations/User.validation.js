const Joi = require('joi')

const verifyRegisterUser = async (req, res, next) => {
    const Schema = Joi.object().keys({
        full_name : Joi.string().min(3).required(),
        email : Joi.string().email().required(),
        phone_number : Joi.string().regex(/^[0-9]{12}$/).messages({
            'string.pattern.base' : `Phone number must be have 12 digits.`
        }).required(),
        password : Joi.string().min(8).required(),
        gender : Joi.any().allow('laki-laki', 'perempuan').required()
    })
    if (Schema.validate(req.body).error) {
        res.json({
            error : Schema.validate(req.body).error.message,
        })
    } else {
        next()
    }
}

const verifyUpdateUser = async (req, res, next) => {
    const Schema = Joi.object().keys({
        full_name : Joi.string().min(3).required(),
        email : Joi.string.email().required(),
        phone_number : Joi.string().regex(/^[0-9]{12}$/).messages({
            'string.pattern.base' : `Phone number must be have 12 digits.`
        }).required(),
        gender : Joi.any().allow('laki-laki', 'perempuan').required()
    })
    if (Schema.validate(req.body).error) {
        res.json({
            error : Schema.validate(req.body).error.message,
        })
    } else {
        next()
    }
}

module.exports = {
    verifyRegisterUser,
    verifyUpdateUser
}
