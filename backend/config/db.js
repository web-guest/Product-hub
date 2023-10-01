const mongoose =require('mongoose')
const connectdb=async()=>{
    try {
        const conn= await mongoose.connect(process.env.CONNECTION)
        console.log(`database successfully connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=connectdb