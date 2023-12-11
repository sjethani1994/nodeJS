const jwt =require('jsonwebtoken')
async function jwtHandler(req,res,next){
    //headers
    //we recieve token from client in req.header authroization section;
    const token = req.header('Authorization');
    console.log(token,"token here");

    if(!token){
        return res.status(401).json({
            message:"Unauthorized:no token provided"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        console.log(decoded.data,"from jwt handler");
        req.userId =decoded.data;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({
            message:"Something went wrong with tokens"
        })
    }

 

}


module.exports=jwtHandler;