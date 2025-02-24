const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags:[{type:String}],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  }, { timestamps: true });

  const BlogsModel = mongoose.model('blog', blogSchema);

module.exports = BlogsModel;