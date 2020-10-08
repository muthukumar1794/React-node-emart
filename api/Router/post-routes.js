const express = require('express')
const feedRouter = express.Router()
const feedControllers = require('../controller/product')
const authRoutes = require('./authRoutes')

feedRouter.post('/feed-post/data',authRoutes,feedControllers.addPost)
feedRouter.get('/feed-post/list',authRoutes,feedControllers.homeFeed)
feedRouter.get('/single-post/view/:postID',authRoutes,authRoutes,feedControllers.viewFeed)
feedRouter.put('/single-post/edit/:postID',authRoutes,feedControllers.editFeed)
feedRouter.delete('/single-post/delete/:postID',authRoutes,feedControllers.deleteFeed)
feedRouter.get('/product/add-to-cart/:postID',authRoutes,feedControllers.addToCart)
feedRouter.get('/product/viewcart',authRoutes,feedControllers.cartView)
feedRouter.get('/product/view-order',authRoutes,feedControllers.Checkout)
feedRouter.get('/product/get-order',authRoutes,feedControllers.myOrders)


module.exports = feedRouter