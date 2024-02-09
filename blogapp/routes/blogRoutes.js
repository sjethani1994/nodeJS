const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");

router.use(authMiddleware);

router.post("/createBlog", authMiddleware, blogController.createBlog);
router.get("/getAllBlogs", authMiddleware, blogController.getAllBlogs);
router.get("/getBlogById/:id", authMiddleware, blogController.getBlogById);
router.post("/updateBlog/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
