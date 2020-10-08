const mongoose =require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    userID:{
        type:Schema.Types.ObjectId,ref:'user'
    }
})

module.exports = mongoose.model('product',productSchema)