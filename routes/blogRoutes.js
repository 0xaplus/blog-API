const blogRoutes = require("express").Router();
const blogController = require("../controllers/blogController");

blogRoutes.get("/all-blogs", blogController.getAllblogs);
blogRoutes.get("/:id", blogController.getBlogByID);
blogRoutes.post("/new", blogController.newBlog);
blogRoutes.put("/:id", blogController.updateBlogByID);
blogRoutes.delete("/:id", blogController.deleteBlogByID);

module.exports = blogRoutes;
