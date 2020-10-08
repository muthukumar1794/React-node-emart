const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    cart:{
        items:[
            {productID:{type:Schema.Types.ObjectId,ref:'product',
            required:true
        },
            quantity:{type:Number,required:true}
        }
        ]
    }
})


userSchema.methods.AddToCart = function(prodID){
    let newQuantity = 1
    let updatedCart
    if(this.cart.items==null){
        updatedCart = {items:[{productID:mongoose.Types.ObjectId( prodID),quantity:1}]}
    }
    else{
    const productIndex = this.cart.items.findIndex(p=>{
        return p.productID.toString() === prodID.toString()
    })

    if(productIndex>-1){
       const oldQty = this.cart.items[productIndex].quantity 
      this.cart.items[productIndex].quantity = oldQty + newQuantity
      updatedCart = this.cart
    }
   if(productIndex==-1){
       this.cart.items.push({productID:prodID,quantity:newQuantity})
      
        updatedCart = this.cart
        console.log("updated cart",updatedCart)
    }
}
this.cart = updatedCart

return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart.items = []
    return this.save()
}

module.exports = mongoose.model('user', userSchema)