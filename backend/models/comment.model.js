const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true },
}, { timestamps: true });

const CommentModel= mongoose.model('comment', commentSchema);

module.exports = CommentModel;
