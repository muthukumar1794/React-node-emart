const express = require('express')
const loginRouter = express.Router()
const loginController = require('../controller/login')

loginRouter.post('/login/post' ,loginController.postLogin)
loginRouter.post('/signup/post',loginController.postSignup)
module.exports = loginRouter
