const userModel = require("../models/user.models");
const tokenBlacklistModel = require("../models/blacklist.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "please provide email,username and password" });
  }
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  }); //either with username or email
  if (isUserAlreadyExist) {
    return res
      .status(400)
      .json({ message: "user with this email or username already exist" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
        username, email, password: hash 
    })
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token)
    res.status(201).json({ message: "user registered successfully",user:{id:user._id,username:user.username,email:user.email} });
}

/**
 * @name  loginUserController
 * @description  a login user expects email and password in the request body 
 * @access public
 */
async function loginUserController(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"invalid email or password"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"invalid email or password"})
    }
    const token = jwt.sign(
        {id:user._id,
        username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token)
    res.status(200).json({message:"user logged in successfully",user:{id:user._id,username:user.username,email:user.email}}) 
}

async function logoutUserController(req,res){
    const token = req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token");
    res.status(200).json({message:"user logged out successfully"})
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access private
 */

async function getMeController(req,res){
    
    const user = await userModel.findById(req.user.id)
    res.status(200).json({message:"user details retrieved successfully",user:{id:user._id,username:user.username,email:user.email}})
}


module.exports = { 
    registerUserController ,
    loginUserController,
    logoutUserController,
    getMeController
};
