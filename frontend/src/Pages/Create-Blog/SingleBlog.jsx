import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { openSnackbar } from "../../Store/actions";
import { useSelector, useDispatch } from "react-redux";
const dummyImage =
  "https://st4.depositphotos.com/3538469/23945/v/450/depositphotos_239459018-stock-illustration-user-sign-icon-person-symbol.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import BlogSkeleton from "../../components/BlogSkeleton";
import SendIcon from "@mui/icons-material/Send";
export default function SingleBlog() {
  const { token, id } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  // console.log(blog);
  const [isFetching, setIsFetching] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [isSumbitting, setIsSubmitting] = useState(false);
  /*__________pure functions */
  function formatDateTime(inputDate) {
    const date = new Date(inputDate);

    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = date.toLocaleString("en-US", optionsTime);

    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const dateString = date.toLocaleString("en-US", optionsDate);

    return [timeString, dateString];
  }

  /*___________async functions___________ */
  const fetchBlog = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/${blog_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlog(response.data.data);
    } catch (error) {
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
      setBlog(null);
    } finally {
      setIsFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function toggleLike() {
    setIsToggling(true);
    try {
      if (blog.likes.includes(id)) {
        await axios.post(`${BACKEND_URL}/blog/unlike/${blog._id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog((prev) => ({
          ...prev,
          likes: prev.likes.filter(
            (userId) => userId.toString() !== id.toString()
          ),
        }));
      } else {
        await axios.post(`${BACKEND_URL}/blog/like/${blog._id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog((prev) => ({ ...prev, likes: [...prev.likes, id.toString()] }));
      }
    } catch (error) {
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
    } finally {
      setIsToggling(false);
    }
  }
  async function postComment(event) {
    event.preventDefault();
    setIsSubmitting(true)
    try {
      const response = await axios.post(
        `${BACKEND_URL}/blog/comment/${blog._id.toString()}`,
        { comment: event.target[0].value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(openSnackbar(response.data.message,'success'))
      setBlog(prev=>({...prev,comments:[...prev.comments,response.data.data]}))
      event.target[0].value=""
    } catch (error) {
      
      dispatch(openSnackbar(error.response?.data.message || error.message,'error'))
    }finally{
      setIsSubmitting(false)
    }
  }
  /*___________useEffects */
  useEffect(() => {
    document.title = "Blog | Panini8 Blogs";
    if (!token) navigate("/singin");
    // if (token) fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, blog_id]);
  return (
    <main className="z-0 mt-15 pt-3 flex flex-col items-center gap-4 px-20 h-[90vh] w-full overflow-hidden">
      <section className="relative bg-white border border-slate-300 w-full max-w-lg p-2 rounded-md shadow-md">
        {isFetching ? (
          <BlogSkeleton />
        ) : blog ? (
          <section className="flex flex-col gap-1">
            <article className="flex flex-col mr-1 gap-2 p-2 border border-slate-300 rounded-md">
              <div className="flex gap-2 items-center">
                <img
                  src={blog.author.image || dummyImage}
                  alt={`${blog.author.first_name} ${blog.author.last_name}`}
                  className="w-12 rounded-full"
                />

                <div className="flex flex-col ">
                  <h3 className="text-lg">{`${blog.author.first_name} ${blog.author.last_name}`}</h3>
                  <div className="flex flex-col ">
                    <p className="text-xs">
                      {formatDateTime(blog.createdAt)[0]}
                    </p>
                    <p className="text-xs">
                      {formatDateTime(blog.createdAt)[1]}
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-medium">{blog.title}</h2>
              <p>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="ml-1 text-blue-500  px-1  underline cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </p>
              {/* {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="m-auto min-h-[300px]"
                />
              )} */}
              <p className="line-clamp-2">{blog.content}</p>
              <div className="flex justify-evenly gap-8 p-4 pb-2">
                <button
                  onClick={toggleLike}
                  disabled={isToggling}
                  className="flex flex-col items-center gap-2 p-1 "
                >
                  <ThumbUpIcon
                    fontSize="large"
                    className={`-scale-x-100 ${
                      blog.likes.includes(id) && "text-primary"
                    }`}
                  />
                  <p>
                    {blog.likes.length} Like{blog.likes.length > 1 && "'s"}
                  </p>
                </button>
                <a
                  href={`/blog/${blog._id.toString()}`}
                  className="flex flex-col items-center gap-2 p-1"
                >
                  <CommentIcon fontSize="large" />
                  <p>Comment</p>
                </a>

                <button className="flex flex-col items-center gap-2 p-1">
                  <ShareIcon fontSize="large" />
                  <p>Share</p>
                </button>
              </div>
            </article>

            <section className="p-2 border border-slate-300 rounded-sm">
              <form id="comment-form" onSubmit={postComment} className="flex items-center gap-2">
                <textarea
                  name=""
                  id=""
                  className="w-4/5 border border-slate-400 min-h-12 max-h-24"
                ></textarea>
                <button
                  type="submit"
                  className="w-1/5 text-lg h-12 self-end p-1 px-2 rounded-full bg-primary text-white"
                >
                  <SendIcon fontSize="large" />
                </button>
              </form>
            </section>
          </section>
        ) : (
          <h3 className=" min-h-[200px] max-w-full text-center text-red-500  text-4xl font-semibold  p-1">
            Blog not found!!
          </h3>
        )}
      </section>
    </main>
  );
}
