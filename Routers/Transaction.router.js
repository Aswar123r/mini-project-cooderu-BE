const Router = require('express').Router()
const Transaction = require('../Controllers/Transaction.controller')

Router.post('/', Transaction.create)

module.exports = Router