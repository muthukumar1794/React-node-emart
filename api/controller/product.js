const feedPost = require('../model/product')
const UserData = require('../model/user')
const Order = require('../model/order')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')

exports.addPost = async(req, res, next) => {
    try{
        let imagePath
        if (!req.files) {
            return new Error('image is mandatory')
        }
        const userObj = await UserData.findOne({_id:req.userID})
        const posts = await new feedPost({
        title: req.body.title,
        description: req.body.description,
        imageURL: req.files[0].path,
        userID: userObj
    })
   const success = await posts.save()
        res.status(201).json({
            message: "success",
            response: success
        })
    }
catch(err){
        throw err
    }

}

exports.homeFeed = async (req, res, next) => {
    let totalnos
    let postperPage = 2
    let currentPage = req.query.page
    try {
        const userObj = await UserData.findOne({_id:req.userID})
        totalnos = await feedPost.find({userID:userObj._id}).countDocuments()
        const products = await feedPost.find({userID:userObj._id}).skip((currentPage - 1) * postperPage).limit(postperPage)

        res.status(200).json({
            message: 'success',
            data: products,
            totalContent: totalnos
        })
    } catch (err) {
        throw err
    }

}

exports.editFeed = async (req, res, next) => {
    try {
        const id = req.params.postID
        const post = await feedPost.findById({
            _id: id
        })
        if (_.isEmpty(req.files)) {
            console.log("fffffffffffff")
            post.title = req.body.title
            post.description = req.body.description
            return post.save()

        }
        fs.unlinkSync(path.join(path.dirname(process.mainModule.filename), post.imageURL))

        post.title = req.body.title
        post.description = req.body.description
        post.imageURL = req.files[0].path
        const result = await post.save()
        res.status(201).json({
            message: "success",
            response: result
        })
    } catch (err) {
        throw err
    }
}

exports.viewFeed = async (req, res, next) => {
    try {
        const id = req.params.postID
        const result = await feedPost.findById(id)
        res.status(200).json({
            response: result
        })
    } catch (err) {
        throw error
    }
}

exports.deleteFeed = async (req, res, next) => {
    try {
        const postID = req.params.postID
        const result = await feedPost.findOneAndDelete({
            _id: postID
        })
        res.status(200).json({
            message: "success",
            response: result
        })
    } catch (err) {
        throw err
    }
}

exports.addToCart = (req,res,next)=>{
    console.log("111111111111111",req.params.postID)
    const pID = req.params.postID.toString()
    UserData.findOne({_id:req.userID}).then(user=>{
        user.AddToCart(pID)
    }).then(result=>{
        res.status(200).json({message:"success"})
    }).catch(err=>{
        throw err
    })

}
exports.cartView = (req,res,next)=>{
    // let userData

    UserData.findOne({_id:req.userID}).then(user=>{
       return user.populate('cart.items.productID')
   .execPopulate()})
.then(products=>{
    console.log("hhhhhhhhhhhh",products)
 res.status(200).json({message:"success",response:products})
})
.catch(error=>{console.log("get cart error",error)})
}

exports.DeleteCartProduct = (req,res,next)=>{
    const prodID = req.params.prodID
    User.deleteCartProduct(prodID,req.user)
    .then(result=>{
        console.log("resulttttt")
        res.redirect('/shop/cart')
    })
}
exports.Checkout = async(req,res,next)=>{
   const Userdata = await UserData.findOne({_id:req.userID})
   Userdata.populate('cart.items.productID')
    .execPopulate()
    .then(user=>{
        const products = user.cart.items.map(p=>{
            return{products:{...p.productID._doc},quantity:p.quantity}
         })
            const order = new Order({
             userID:Userdata,
             order:products
         })
        return order.save()
         })
        .then(p=>{
            Userdata.clearCart()
}).then(success=>{
        res.status(200).json({message:'success',response:success})
    }).catch(err=>{
        console.log("checkout error",err)
    })

}
exports.myOrders = (req,res,next)=>{
    Order.find({userID:req.userID})
    .populate('userID')
    .exec().then(myorders=>{
         console.log("orrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",myorders)
         res.status(200).json({message:'success',response:myorders})
     })
 .catch(error=>{
     console.log("erererere",error)
 })
 
  
 }