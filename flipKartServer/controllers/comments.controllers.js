const commentModel =require('../models/commentSchema.model');


const addComments = async(req,res)=>{
    //comment msg, userid,productid;
   try {
    const {commentMsg,userId,productId} =req.body;

    const createdComment = await commentModel.create({
        commentMsg,userId,productId
    })

    res.status(200).json({
        message:"Comments created.",
        createdComment
    })
   } catch (error) {
    console.log(error.message,"from comment api");
    res.status(404).json({
        message:error.message
    })
   }
}

// API endpoint to get all comments;
const allComments = async(req,res)=>{
    try {
        const allComments = await commentModel.find().populate('userId').populate('productId');
        res.status(200).json({
            message:"all documents",
            allComments
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:error.message
        })
    }
}

const updateComment = async (req, res) => {
    try {
      // Extract comment ID from request parameters and comment details from request body
      const { id } = req.params;
      const { commentMsg, productId, userId } = req.body;
  
      // Update the comment and get the updated document
      const updatedComment = await commentModel.findByIdAndUpdate(
        id,
        { commentMsg, productId, userId },
        { new: true }
      );
  
      // Check if the comment was found and updated
      if (!updatedComment) {
        return res.status(404).json({
          message: "Comment not found or could not be updated",
        });
      }
  
      // Respond with the updated comment
      res.status(200).json({
        message: "Comment updated successfully",
        updatedComment,
      });
    } catch (error) {
      console.error("Error during comment update:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
module.exports={
    addComments,
    allComments,
    updateComment
};
