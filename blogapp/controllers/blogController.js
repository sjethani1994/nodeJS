const Blog = require("../models/Blog");
const multer = require("multer");

// Create a new blog
exports.upload = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const imagePath = req.file.path; // Getting the path of the uploaded image

    // Create a new blog entry with the image path
    const newBlog = new Blog({ title, content, avatar: imagePath, userId });

    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs for the authenticated user
exports.getAllBlogsOfUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: userId });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const imagePath = req.file.path; // Getting the path of the uploaded image

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, avatar: imagePath, userId },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Send the response with proper JSON formatting
    res.status(200).json({ message: "Blog Updated Successfully", updatedBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
