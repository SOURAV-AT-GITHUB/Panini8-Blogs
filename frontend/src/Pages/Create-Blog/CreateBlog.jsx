import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { openSnackbar } from "../../Store/actions";
import {postBlog} from "../../Store/blogs.action"
export default function CreateBlog() {
  /*_____________States and hooks___________ */
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [tags, setTags] = useState([""]);

  /*_____________pure functions_____________ */
  function validateTag(str) {
    if (!str) return true;
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(str);
  }
  const handleTagUpdate = (index, value) => {
    if (!validateTag(value)) return;

    setTags((prev) => prev.map((tag, i) => (index === i ? value : tag)));
  };
  const handleTagRemove = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };
  const handleAddTag = () => {
    setTags((prev) => [...prev, ""]);
  };

  /*_____________async functions____________ */
 async function handlePostBlog(event){
    event.preventDefault()
    const title = event.target[0].value
    const content = event.target[1].value
    try {
      
      const response = await axios.post(`${BACKEND_URL}/blog`,{title,content,tags},{headers:{
        authorization: `Bearer ${token}`
      }})
      dispatch(openSnackbar(response.data.message,'success'))
      dispatch(postBlog(response.data.data))
      navigate("/")
    } catch (error) {
      dispatch(openSnackbar(error.response?.data.message || error.message,'error'))
    }
  }
/*________________useEffects_______________ */
  useEffect(() => {
    document.title = "Create Blog | panini 8 blogs";
    if (!token) navigate("/signin");
  }, [token]);
  return (
    <main className="z-0 mt-15 pt-3 flex flex-col items-center gap-4 px-2 lg:px-16 h-[90vh] overflow-hidden">
      <section className="bg-white border border-slate-300 w-full max-w-[768px] p-2 rounded-md shadow-md">
        <h2 className="text-center text-3xl font-semibold text-primary">
          Create a new Blog
        </h2>
        <form onSubmit={handlePostBlog} className="p-2 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p>Blog Title *</p>
            <input
              type="text"
              required
              placeholder="Enter blog title"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Blog Content *</p>
            <textarea
              type="text"
              required
              placeholder="Enter blog content"
              className="border border-slate-400 p-2 min-h-[100px] max-h-[200px] rounded-md"
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <p>Related Image (.jpg, .png, .webp, .jfif, .jpeg only)</p>
            <input
              type="file"
              accept=".jpg, .png, .webp, .jfif, .jpeg"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <p>Add related tags</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-px border border-slate-400 p-1 rounded-md"
                >
                  <p className="">#</p>
                  <input
                    type="text"
                    required
                    value={tag}
                    onChange={(e) => handleTagUpdate(index, e.target.value)}
                    minLength={2}
                    placeholder="tag"
                    className="w-full outline-0"
                  />
                  {tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleTagRemove(index)}
                      className="absolute right-1 top-1"
                    >
                      <CancelOutlinedIcon fontSize="small" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTag}
              className="w-fit bg-blue-400 text-white rounded-full py-1 px-2"
            >
              Add more tags
            </button>
          </div>
          <button
            type="submit"
            className="bg-primary text-white rounded-full py-2"
          >
            Post Blog
          </button>
        </form>
      </section>
    </main>
  );
}
