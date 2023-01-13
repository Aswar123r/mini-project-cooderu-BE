const Joi = require('joi')
const {Product} = require('../../models')

const validateOwners = async ({productId, id}) => {
    const validateUser = await Product.findOne({where : {id : productId, user_id : id}})
        if(!validateUser) return 'You Do Not Have Access This Product'
        return false
}
const verifyCreateProduct = async (req, res, next) => {
     const {productId} = req.params
     const {id} = req.user
    const Schema = Joi.object().keys({
        name : Joi.string().min(3).max(40).required(), 
        price : Joi.number().required(), 
        stock : Joi.number().required(), 
        description : Joi.string().min(50).max(300).required()
    })
    const validateOwner = validateOwners({productId, id})
    if (Schema.validate(req.body).error) return res.json({
            error : Schema.validate(req.body).error.message,
        })
    else if (validateOwner) res.status(404).json({
            message : validateOwner
        })
    else next()
}
const verifyDeleteProduct = async (req, res, next) => {
     const {productId} = req.params
     const {id} = req.user
    
    const validateOwner = validateOwners({productId, id})
    if (validateOwner) res.status(404).json({
            message : validateOwner
        })
    else next()
}

module.exports = {
    verifyCreateProduct,
    verifyDeleteProduct
}