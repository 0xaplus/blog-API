const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    // ref:
  },
  timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
});

module.exports = mongoose.model("blog", blogSchema);
