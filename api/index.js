const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const multer = require('multer')
const path = require('path')


const authRoutes = require('./Router/authRoutes')
const Routes = require('./Router/routerconfig')

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now().toString()+'-'+file.originalname)
    }
})
const filefilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png'){
        cb(null,true)
    }
}

app.use('/images',express.static(path.join(path.dirname(process.mainModule.filename),'images')));
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(multer({storage:fileStorage,fileFilter:filefilter}).any())


Routes.map(Route=>{app.use(Route)})
app.use('/auth',authRoutes)

app.use((error,req,res,next)=>{
console.log("eapipapi error",error.message)
    res.status(error.statusCode).json({message:error.message,statusCode:error.statusCode})
})

mongoose.connect('mongodb+srv://muthukumar:muthukumar1234@cluster0.8ekgi.mongodb.net/emart?retryWrites=true&w=majority',{useUnifiedTopology: true,useNewUrlParser: true}).then(success=>{
    app.listen(8080)
    console.log("started")
}).catch(err=>{
    throw new Error('DB connection failure')
})



