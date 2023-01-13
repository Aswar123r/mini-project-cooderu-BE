const {Product, Transaction, User} = require('../models')
const {Op} = require('sequelize')

class ProductControllers {
    static async Create (req, res) {
        const {id} =req.user
        const {name, price, stock, description} = req.body
        try {
            const insertProduct = await Product.create({name : name, price : price, stock : stock, description : description, user_id : id})
            return res.status(201).json({
                message : 'The Product Is Successfully Made',
                data : insertProduct
            })
        }catch (err) {
            console.log(err) 
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async Update (req, res) {
        const {productId} = req.params
        const {id} = req.user
        const {name, price, stock, description} = req.body
        const validateUser = await Validation.validateOwner({productId, id})
        if(validateUser) return res.status(404).json({
                message : validateUser
            })
        try {
            await Product.update({name : name, price : price, stock : stock, description : description}, {where : {id : productId, user_id : id}})
            return res.status(200).json({
                message : 'Product Successfully Updated'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                  message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async Delete (req, res) {
        const {productId} = req.params
        const {id} = req.user
        try {
            await Product.destroy({where : {id : productId, user_id : id}})
            return res.status(200).json({
                message : 'Delete Product SuccessFull'
            })
        } catch (err) {
            console.log(err) 
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async allProductSortByPrice (req, res) {
        let data = req.query
        try {
            if(data.price) {
                const allProduct = await Product.findAll({where : {price : data.price}}, {attributes : {exclude : ['user_id', 'updatedAt', 'createdAt']}})
                return res.status(200).json({
                data : allProduct
            })
            }
            if(data.min && data.max) {
                const allProduct = await Product.findAll({
                    where : {
                        price : {
                            [Op.and] : {
                                [Op.gte] : Number(data.min), 
                                [Op.lte] : Number(data.max)
                            }
                        }
            }}, {attributes : {exclude : ['user_id', 'updatedAt', 'createdAt']}})
             return res.status(200).json({
                data : allProduct
            })
            }
            if(data.max) {
                const allProduct = await Product.findAll({
                    where : {
                        price : {
                                [Op.lte] : Number(data.max)
                            }
                        }
            }, {attributes : {exclude : ['user_id', 'updatedAt', 'createdAt']}})
            return res.status(200).json({
                data : allProduct
            })
            }
            if(data.min) {
                const allProduct = await Product.findAll({
                    where : {
                        price : {
                                [Op.gte] : Number(data.min)
                            }
                        }
            }, {attributes : {exclude : ['user_id', 'updatedAt', 'createdAt']}})
            return res.status(200).json({
                data : allProduct
            })
            }
            const allProduct = await Product.findAll({attributes : {exclude : ['user_id', 'updatedAt', 'createdAt']}})
            if(allProduct) {
                return res.status(400).json({
                data : allProduct
            }) }
        } catch (err) {
            console.log(err) 
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }

    static async allOrder (req, res) {
        const {id} = req.user
        try {
            const Order = await Product.findAll({where : {user_id : id, sold : {[Op.gt] : 0}},
                include : [
                    {
                        model : Transaction,
                            attributes : {exclude : ['user_id', 'product_id', 'updatedAt']},
                            include : [ {
                                model : User,
                                attributes : ['id', 'full_name']
                            }
                            ]
                    }
                ]})
            return res.status(200).json({
                data : Order
            })
        } catch (err) {
            console.log(err) 
            return res.status(500).json({
                message : 'INTERNAL SERVER ERROR'
            })
        }
    }
} 

module.exports = ProductControllers