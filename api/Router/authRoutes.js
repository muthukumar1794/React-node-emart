const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    console.log("tokenCheck",req.get('Authorization'))
    if(!req.get('Authorization')){
        const error = new Error("Not Authorized")
        error.statusCode = 401
        throw error
    }
    const token = req.get('Authorization').split(" ")[1]
    try{
        const decodedUserData = jwt.verify(token,'my secret')
        req.userID = decodedUserData.userID
        next()
    }
    catch(err){
        err.message = "Not Authorized"
        err.statusCode = 440
        throw err
    }
    
}