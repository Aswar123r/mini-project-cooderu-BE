const Router = require('express').Router()
const Product = require('../Controllers/Product.controller')
const sellerAutorisation = require('../Middlewares/Seller.middleware.js')
const {verifyCreateProduct, verifyDeleteProduct} = require('../Middlewares/Validations/Product.validation')

Router.get('/', Product.allProductSortByPrice)
Router.use(sellerAutorisation)
Router.get('/order', Product.allOrder)
Router.post('/', verifyCreateProduct, Product.Create)
Router.put('/:productId', verifyCreateProduct, Product.Update)
Router.delete('/:productId',verifyDeleteProduct, Product.Delete)

module.exports = Router