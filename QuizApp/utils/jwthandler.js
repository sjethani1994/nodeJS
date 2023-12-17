const jwt =require('jsonwebtoken');
const UserModel = require('../models/userSchema.model');
async function jwtHandler(req,res,next){
    //headers
    //we recieve token from client in req.header authroization section;
    const token = req.header('Authorization');
11
    if(!token){
        return res.status(401).json({
            message:"Unauthorized:no token provided"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = decoded.data;
        const user = await UserModel.findById(req.userId);
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({
            message:"Something went wrong with tokens"
        })
    }

 

}


module.exports=jwtHandler;