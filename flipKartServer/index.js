const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const port = 5000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Function to connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sjethani651:Sjethani%4094@hatch.zcgjpl5.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
}

// Connect to MongoDB
connectToDB()
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

// User details schema definition
const userDetailsSchema = new Schema({
  // Define the user details schema fields
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 5,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value.includes("@");
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 5;
      },
    },
  },
});

// User details model
const userDetailsModel = mongoose.model("FlipKartUsers", userDetailsSchema);

// Product details schema definition
const productDetailsSchema = new Schema(
  {
    // Define the product details schema fields
    productName: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productDetails: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
      default: 10,
    },
    productImage: {
      type: String,
    },
    rating: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Product model
const productModel = mongoose.model("flipKartProducts", productDetailsSchema);

// Comments Section schema definition
const commentSchema = new Schema({
  commentMsg: {
    type: String,
    required: true,
  },
  userId: {
    //referencing
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlipKartUsers",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flipKartProducts",
    required: true,
  },
});

const commentModel = mongoose.model("flipkartComments", commentSchema);

/**
 * API Endpoints For User Details
 */

app.post("/user/login", async (req, res) => {
  const { email, userName, password } = req.body;

  // Check if all required credentials are provided
  if (!email || !userName || !password) {
    return res.json({
      message: "Please enter all your credentials",
    });
  }

  try {
    // Attempt to find a user by email
    const userByEmail = await userDetailsModel.findOne({ email: email });

    // If no user is found by email, provide an appropriate message
    if (!userByEmail) {
      return res.json({
        message: `User with this ${email} is not found!`,
      });
    }

    // Check if the provided userName matches the found user's userName
    if (userByEmail.userName !== userName) {
      return res.json({
        message: `User with this ${userName} is not found!`,
      });
    }

    // Check if the provided password matches the found user's password
    if (userByEmail.password === password) {
      return res.json({
        message: `User with ${email} has been logged in`,
      });
    } else {
      // If the password is incorrect, provide an appropriate message
      return res.json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    // Handle unexpected errors, log them, and provide a generic error message
    console.error("Error during login:", error);
    return res.status(404).json({
      message: error.message,
    });
  }
});

// Endpoint to handle user registration
app.post("/user/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Create a new user in the database
    const insertedUser = await userDetailsModel.create({
      userName,
      email,
      password,
    });

    // Respond with the inserted user data
    res.json(insertedUser);
  } catch (err) {
    // Handle errors during user registration
    res.status(500).send(err.message);
  }
});

// Update user endpoint
app.post("/user/updateUser/:userId", async (req, res) => {
  try {
    // Extract userId from request parameters and userName from request body
    const { userId } = req.params;
    const { userName } = req.body;

    // Basic validation to check if userName is provided
    if (!userName) {
      return res.status(400).json({
        message: "Please provide a valid userName for the update",
      });
    }

    // Attempt to update the user by userId
    const updatedDoc = await userDetailsModel.findByIdAndUpdate(
      userId,
      { userName: userName },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        message: `User with id ${userId} not found`,
      });
    }

    // Respond with a success message and the updated document
    return res.json({
      message: `User with id ${userId} has been updated`,
      updatedDoc,
    });
  } catch (error) {
    // Handle unexpected errors, log them, and provide a generic error message
    console.error("Error during user update:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Delete user endpoint
app.post("/user/deleteUser/:userId", async (req, res) => {
  try {
    // Extract userId from request parameters and userName from request body
    const { userId } = req.params;
    const { userName } = req.body;

    // Basic validation to check if userName is provided
    if (!userName) {
      return res.status(400).json({
        message: "Please provide a valid userName to delete the user",
      });
    }

    // Attempt to find a user by userId in the userDetailsModel
    const userToDelete = await userDetailsModel.findById(userId);

    // Check if the user with the specified userId exists and if the userName matches
    if (!userToDelete || userToDelete.userName !== userName) {
      return res.status(400).json({
        message: "Invalid userName or User not found for the provided userId",
      });
    }

    // Attempt to delete the user by userId
    const deletedUser = await userDetailsModel.findByIdAndDelete(
      userId,
      { userName: userName },
      { new: true } // Return the updated document after deletion
    );

    // Check if the user with the given userId was found and deleted
    if (!deletedUser) {
      return res.status(404).json({
        message: `User with id ${userId} not found`,
      });
    }

    // Respond with a success message and the details of the deleted user
    return res.json({
      message: `User with id ${userId} has been deleted successfully`,
      deletedUser,
    });
  } catch (error) {
    // Handle unexpected errors, log them, and provide a generic error message
    console.error("Error during user deletion:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/**
 * API Endpoints For Product Details
 */
app.post("/product/addProduct", async (req, res) => {
  try {
    const {
      productName,
      category,
      productDetails,
      price,
      productQuantity,
      rating,
    } = req.body;

    // Create a new product in the database
    const insertedProduct = await productModel.create({
      productName,
      category,
      productDetails,
      price,
      productQuantity,
      rating,
    });

    // Respond with the inserted product data
    res.status(200).json({
      message: "Product added successfully",
      insertedProduct,
    });
  } catch (error) {
    // Handle unexpected errors, log them, and provide a generic error message
    console.error("Error during product insertion:", error);
    return res.status(404).json({
      message: error.message,
    });
  }
});

// Update product endpoint
app.post("/product/updateProduct/:id", async (req, res) => {
  try {
    // Extract product ID from request parameters and product details from request body
    const { id } = req.params;
    const { productDetails, price } = req.body;

    // Update the product and get the updated document
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { productDetails, price },
      { new: true }
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found or could not be updated",
      });
    }

    // Respond with the updated product
    res.status(200).json({
      message: "Product data updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error during product update:", error);
    return res.status(404).json({
      message: error.message,
    });
  }
});

// Delete product endpoint
app.post("/product/deleteproduct/:productId", async (req, res) => {
  try {
    // Extract product ID from request parameters
    const { productId } = req.params;

    // Attempt to delete the product by productId
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    // Check if the product with the specified productId exists
    if (!deletedProduct) {
      return res.status(404).json({
        message: `Product with id ${productId} not found`,
      });
    }

    // Respond with a success message and the details of the deleted product
    return res.json({
      message: `Product with id ${productId} has been deleted successfully`,
      deletedProduct,
    });
  } catch (error) {
    // Handle unexpected errors, log them, and provide a generic error message
    console.error("Error during product deletion:", error);
    return res.status(404).json({
      message: error.message,
    });
  }
});

// Filter products by price range endpoint
app.post("/product/filter", async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    // Filter products by price range
    const filteredProduct = await productModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    // Respond with the filtered products
    res.status(200).json({
      filteredProduct,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      message: error.message,
    });
  }
});

/**
 * API Endpoints For Comments Schema
 */

app.post("/comment/create", async (req, res) => {
  //comment msg, userid,productid;
  try {
    const { commentMsg, userId, productId } = req.body;

    const createdComment = await commentModel.create({
      commentMsg,
      userId,
      productId,
    });

    res.status(200).json({
      message: "Comments created.",
      createdComment,
    });
  } catch (error) {
    console.log(error.message, "from comment api");
    return res.status(404).json({
      message: error.message,
    });
  }
});

// API endpoint to get all comments with user and product details
app.get("/comment/read", async (req, res) => {
  try {
    // Retrieve all comments from the database and populate the associated user and product information
    const allComments = await commentModel
      .find()
      .populate("userId")
      .populate("productId");
    // Respond with the populated comments
    res.status(200).json({
      message: "All comments with user and product details",
      allComments,
    });
  } catch (error) {
    // Handle errors during the retrieval process
    console.error(error);

    // Respond with an error status and message
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/comment/updateComment/:id", async (req, res) => {
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
});
