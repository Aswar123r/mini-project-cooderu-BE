const Router = require('express').Router()
const Admin = require('../Controllers/Admin.controller')
const adminAutorisation = require('../Middlewares/Admin.middleware')

Router.use(adminAutorisation)
Router.patch('/topup', Admin.topUp)
Router.patch('/seller/:sellerId', Admin.makeSeller)

module.exports = Router