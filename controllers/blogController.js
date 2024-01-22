const blogModel = require("../models/blogModel");

// READ
async function getAllblogs(_, res) {
  try {
    const allblog = await blogModel.find({});
    res.status(200).send(allblog);
  } catch (error) {
    res.status(500).send(error);
  }
}

// READ by Id
async function getBlogByID(req, res) {
  try {
    const id = req.params.id;
    const foundBlog = await blogModel.findById(id);

    if (!foundBlog) {
      res.status(404).send({ message: "Blog Not Found." });
      return;
    }

    res.status(200).send(foundBlog);
  } catch (error) {
    res.status(500).send(error);
  }
}

// // CREATE
async function newBlog(req, res) {
  const newBlog = req.body;

  try {
    // Checks if the newBlog sent is empty
    if (Object.keys(newBlog).length === 0) {
      res
        .status(400)
        .send({ message: "Bad Request - Blog content cannot be empty!" });
      return;
    }

    await blogModel.create(newBlog);
    res.status(201).send({message: "Blog created successfully!"});
  } catch (error) {
    res.status(500).send(error);
  }
}

// UPDATE
async function updateBlogByID(req, res) {
  try {
    const id = req.params.id;
    const content = req.body; // content to update with

    const updatedBlog = await blogModel.findByIdAndUpdate(id, content, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send(updatedBlog);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

// DELETE
async function deleteBlogByID(req, res) {
  try {
    const id = req.params.id;
    const blogToDel = await blogModel.findByIdAndDelete(id);

    if (!blogToDel) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

module.exports = {
  getAllblogs,
  getBlogByID,
  newBlog,
  updateBlogByID,
  deleteBlogByID,
};
