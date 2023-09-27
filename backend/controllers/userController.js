const User= require('../models/userModel')
const asyncHandler=require("../middleware/asyncHandler")

exports.authUser= asyncHandler(async(req, res)=>{
    res.send('login user')
})

exports.registerUser= asyncHandler(async(req, res)=>{
    res.send('register user')
})

exports.logoutUser= asyncHandler(async(req, res)=>{
    res.send('logout user')
})

exports.getUserProfile= asyncHandler(async(req, res)=>{
    res.send('get user')
})

exports.updateUserProfile= asyncHandler(async(req, res)=>{
    res.send('update user')
})

