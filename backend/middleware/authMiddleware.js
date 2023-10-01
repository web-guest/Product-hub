const jwt= require("jsonwebtoken")
const asyncHandler= require("./asyncHandler")
const User= require("../models/userModel")

exports.protect=asyncHandler(async(req, res, next)=>{
    let token;
    token=req.cookies.jwt;
    // console.log(token)
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user= await User.findById(decoded.userId).select('-password')
            next()
            
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    }
    else{
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

// admin middleware

exports.admin=(req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('not authorized as admin')
    }
}