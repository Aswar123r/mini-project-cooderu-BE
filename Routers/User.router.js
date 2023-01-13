const Router = require('express').Router()
const User = require('../Controllers/User.controller')
const Auth = require('../Middlewares/Auth.middleware')
const {verifyRegisterUser, verifyUpdateUser} = require('../Middlewares/Validations/User.validation')

Router.post('/register',verifyRegisterUser, User.Register)
Router.post('/login', User.Login)
Router.use(Auth)
Router.put('/', verifyUpdateUser, User.Update)
Router.delete('/', User.Delete)
Router.get('/balance', User.checkBalance)

module.exports = Router