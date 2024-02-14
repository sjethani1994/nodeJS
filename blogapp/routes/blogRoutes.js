const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");
// const multer = require("multer");
const multerMiddleware = require("../middleware/multerMiddleware");
router.use(authMiddleware);
router.post("/upload", authMiddleware, multerMiddleware, blogController.upload);
router.get("/getAllBlogs", authMiddleware, blogController.getAllBlogs);
router.get("/getBlogById/:id", authMiddleware, blogController.getBlogById);
router.post(
  "/updateBlog/:id",
  authMiddleware,
  multerMiddleware,
  blogController.updateBlog
);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
