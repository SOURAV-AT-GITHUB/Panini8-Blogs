const mongoose = require("mongoose");
const BlogRouter = require("express").Router();
const BlogModel = require("../models/blog.model");
const CommentModel = require("../models/comment.model");
const verifyToken = require("../middlewares/verifyToken");
BlogRouter.post("/", verifyToken, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const newBlog = new BlogModel({
      title,
      content,
      tags,
      author: req.user.id,
      likes: [],
      comments: [],
    });
    await newBlog.save();
    return res
      .status(201)
      .json({ message: "Blog posted successfully", data: newBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Internal server error, please try again." });
  }
});
BlogRouter.get("/all-blogs", verifyToken, async (req, res) => {
  try {
    const blogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(10)
      .populate({
        path: "author",
        select: "first_name last_name _id image",
      })
      .populate({
        path: "comments",
        select: "comment author",
        populate: {
          path: "author",
          select: "first_name last_name _id image",
        },
      });
    // .select("-content") // Optional: exclude content if not needed in the response
    return res.json({ data: blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
BlogRouter.get("/my-blogs", verifyToken, async (req, res) => {
  try {
    const blogs = await BlogModel.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "first_name last_name _id image",
      })
      .populate({
        path: "comments",
        select: "comment author",
        populate: {
          path: "author",
          select: "first_name last_name _id image",
        },
      });
    return res.json({ data: blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
BlogRouter.delete("/:blog_id", verifyToken, async (req, res) => {
  const { blog_id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const blog = await BlogModel.findById(blog_id).session(session);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author._id.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this blog" });
    }

    await CommentModel.deleteMany({ blog_id }).session(session);
    const deletedBlog = await BlogModel.findByIdAndDelete(blog_id).session(
      session
    );
    if (!deletedBlog) {
      throw new Error("Failed to delete the blog");
    }
    await session.commitTransaction();
    return res.json({ message: "Blog Deleted!" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
});
BlogRouter.patch("/:blog_id", verifyToken, async (req, res) => {
  const { blog_id } = req.params;
  const { title, content, tags } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const patchedBlog = await BlogModel.findByIdAndUpdate(blog_id, {
      title,
      content,
      tags,
    },{new:true}).session(session);
    if (!patchedBlog) {
      throw new Error("Blog not found");
    }
    if (patchedBlog.author.toString() !== req.user.id.toString()) {
      session.abortTransaction();
      return res
        .status(401)
        .json({ message: "You are no authorized to update this blog" });
    }
    await session.commitTransaction();
    return res.json({ message: "Blog updated :)",data:patchedBlog });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
});
BlogRouter.post("/like/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.likes.push(req.user.id);
    await blog.save();
    return res.status(201).json({ message: "Blog liked." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
BlogRouter.post("/unlike/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.likes = blog.likes.filter(
      (userId) => userId.toString() !== req.user.id
    );
    await blog.save();
    return res.json({ message: "Blog unliked." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

BlogRouter.get("/blog-by-tag/:tag",verifyToken,async(req,res)=>{
  const {tag} = req.params
  try {
    const blogs = await BlogModel.find({
      tags: { $regex: new RegExp(`^${tag}$`, 'i') }  // Case-insensitive match
    });
    if(!blogs.length || !blogs) return res.status(404).json({message:`No blogs found with "${tag}" tag!`})
      return res.json({message: `${blogs.length} blogs found with "${tag}" tag .`,data:blogs})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
})
module.exports = BlogRouter;
