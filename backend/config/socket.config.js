require("dotenv").config()
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const CommentModel = require("../models/comment.model");
module.exports = function socketConfig(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error."));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error("Invalid token"));
      else {
        socket.user = decoded;
        next();
      }
    });
  });

  io.on("connection", async (socket) => {
    console.log(`User connected - ${socket.id}`)
    socket.on("joinRoom", (roomId,callback) => {
      // const room = io.sockets.adapter.rooms.get(roomId);
      // if (!room) {
      //   console.log(`Room created - ${roomId}`);
      // } else {
      //   console.log(`Room exist, joining room - ${roomId}`);
      // }
      socket.join(roomId);
      callback({ success: true, message: `Joined room ${roomId}` });
      
    });

    socket.on("comment",async({roomId,comment},callback)=>{
      try {
        
        const newComment = new CommentModel({
          comment:comment.comment,
          blog_id:roomId,
          author: socket.user.id,
        });
        await newComment.populate({
          path:'author',
          select:'first_name last_name image'
        })
        await newComment.save();
        socket.broadcast.to(roomId).emit('comment',newComment)
         callback({ success:true, comment:newComment });
      } catch (error) {
        callback({ success:false, error:error.message });
      }
    })
    socket.on("disconnect", () => {
      // console.log(`User disconnected - ${socket.id}`);
    });
  });
};
