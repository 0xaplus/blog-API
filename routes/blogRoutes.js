const blogRoutes = require("express").Router();
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");

blogRoutes.get("/all-blogs", blogController.getAllblogs);
blogRoutes.get("/:id", blogController.getBlogByID);
blogRoutes.post("/new", userController.protectUser, blogController.newBlog);
blogRoutes.put("/:id", userController.getUser, blogController.updateBlogByID);
blogRoutes.delete("/:id", userController.getUser, blogController.deleteBlogByID);

module.exports = blogRoutes;
