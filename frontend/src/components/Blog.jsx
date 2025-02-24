import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../Store/actions";
import { likeBlog, unlikeBlog } from "../Store/blogs.action";
import axios from "axios";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import {useNavigate} from 'react-router-dom'
const dummyImage =
  "https://st4.depositphotos.com/3538469/23945/v/450/depositphotos_239459018-stock-illustration-user-sign-icon-person-symbol.jpg";
/* eslint-disable react/prop-types */
export default function Blog({ blog,userId, token }) {
  const dispatch = useDispatch();
  const [isToggling,setIsToggling] = useState(false)
  const navigate = useNavigate()
  function formatDateTime(inputDate) {
    const date = new Date(inputDate);

    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = date.toLocaleString("en-US", optionsTime);

    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const dateString = date.toLocaleString("en-US", optionsDate);

    return [timeString, dateString];
  }
  async function toggleLike(e) {
    e.stopPropagation()
    setIsToggling(true)
    try {
      if (blog.likes.includes(userId)) {
        await axios.post(`${BACKEND_URL}/blog/unlike/${blog._id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(unlikeBlog(blog._id,userId));
      } else {
        await axios.post(`${BACKEND_URL}/blog/like/${blog._id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(likeBlog(blog._id,userId));
      }
    } catch (error) {
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
    }finally{
      setIsToggling(false)
    }
  }
  return (
    <article onClick={()=>navigate(`/blog/${blog._id.toString()}`)} className="flex flex-col mr-1 gap-2 p-2 border border-slate-300 rounded-md cursor-pointer">
      <div className="flex gap-2 items-center">
        <img
          src={blog.author.image || dummyImage}
          alt={`${blog.author.first_name} ${blog.author.last_name}`}
          className="w-12 rounded-full"
        />

        <div className="flex flex-col ">
          <h3 className="text-lg">{`${blog.author.first_name} ${blog.author.last_name}`}</h3>
          <div className="flex flex-col ">
            <p className="text-xs">{formatDateTime(blog.createdAt)[0]}</p>
            <p className="text-xs">{formatDateTime(blog.createdAt)[1]}</p>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-medium">{blog.title}</h2>
      <div>
        {blog.tags.map((tag) => (
          <p
            key={tag}
            className="ml-1 text-blue-500  px-1  underline cursor-pointer"
          >
            #{tag}
          </p>
        ))}
      </div>
      {/* {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="m-auto min-h-[300px]"
                />
              )} */}
      <p className="line-clamp-2">{blog.content} </p>
      <div className="flex justify-evenly gap-8 p-4 pb-2">
        <button
          onClick={toggleLike}
          disabled={isToggling}
          className="flex flex-col items-center gap-2 p-1 "
        >
          <ThumbUpIcon
            fontSize="large"
            className={`-scale-x-100 ${
              blog.likes.includes(userId) && "text-primary"
            }`}
          />
          <p>
            {blog.likes.length} Like{blog.likes.length > 1 && "'s"}
          </p>
        </button>
        <a href={`/blog/${blog._id.toString()}`} className="flex flex-col items-center gap-2 p-1">
          <CommentIcon fontSize="large" />
          <p>Comment</p>
        </a>

        <button className="flex flex-col items-center gap-2 p-1">
          <ShareIcon fontSize="large" />
          <p>Share</p>
        </button>
      </div>
    </article>
  );
}
