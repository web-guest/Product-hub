const path= require('path')
const express= require('express')
const db =require('./config/db')
const dotenv =require('dotenv')
const productRouter=require("./routers/productRouter")
const userRouter=require("./routers/userRouter")
const orderRouter= require("./routers/orderRouter")
const uploadRouter= require("./routers/uploadRouter")
const cookieParser= require("cookie-parser")

const {notFound, errorHandler}=require("./middleware/errorMiddleware")
dotenv.config()
const app=express()
db()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie-parser
app.use(cookieParser())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

app.get('/api/config/paypal', (req, res)=>res.send({clientId: process.env.PAYPAL_CLIENT_ID}))
__dirname= path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))




if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else{
    app.get('/', (req, res)=>{
        res.send('API is running....')
    })
   
}

app.use(notFound)
app.use(errorHandler)
app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})