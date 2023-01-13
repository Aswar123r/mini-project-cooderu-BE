const Router = require('express').Router()
const User = require('./User.router')
const Product  = require('./Product.router')
const Admin = require('../Routers/Admin.router')
const Transaction = require('../Routers/Transaction.router')
const Auth = require('../Middlewares/Auth.middleware')
//const Transaction = require('./Transaction.router')
///const Admin = require('./Admin.router')

Router.use('/users', User)
Router.use(Auth)
Router.use('/transactions', Transaction)
Router.use('/products', Product)
Router.use('/admin', Admin)

module.exports = Router