const errorHandler=(err,req,res,next)=>{
    console.log(err.message);
    res.status(404).json({
        message:err.message
    })
}


module.exports=errorHandler;