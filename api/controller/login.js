const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.postLogin = async(req,res,next)=>{
    try{
    const usercheck = await User.findOne({email:req.body.email})
    if(!usercheck){
        throw err
    }
    const user = await bcrypt.compare(req.body.password,usercheck.password)
    if(!user){
               return new Error('no user exists')
            }
            const token = await jwt.sign({email:usercheck.email,userID:usercheck._id},"my secret",{expiresIn:'1h'})
            res.status(200).json({userData:usercheck,token:token,message:"success"})
        }
catch(error){
        throw new Error('no email exists')
    }
}

exports.postSignup = async(req,res,next)=>{
    try{
    if(req.body.password === req.body.confirmPassword){
      const hashedpw = await bcrypt.hash(req.body.password,12)
            const users = new User({
                email:req.body.email,
                password:hashedpw
            })
         const result = await users.save()

            res.status(201).json({message:"success"})
        }
    else{
        throw new Error('user creation error')
    }
}

catch{
    throw new Error('password does not match')
}

}