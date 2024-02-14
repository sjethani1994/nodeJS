const errorHandler=(err,req,res,next)=>{
    res.status(404).json({
        message:err.message
    })
}


module.exports=errorHandler;