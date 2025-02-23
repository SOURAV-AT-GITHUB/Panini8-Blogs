import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs,getBlogsByTag } from "../../Store/blogs.action";
import Blog from "../../components/Blog";
import BlogSkeleton from "../../components/BlogSkeleton";
// const sampleBlog =     {
//   _id: "67b8f92c0d594005d76503j7",
//   title:
//     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquamtempora ratione perferendis. Voluptates repudiandae delectus veniam",
//   content:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus velit consequuntur animi quos deleniti sapiente voluptas placeat ratione dolor dolore unde voluptate, quibusdam qui laboriosam? Distinctio fuga totam itaque aspernatur! Atque nostrum sequi dicta eos suscipit nesciunt dolorem numquam. Repudiandae maiores, quo numquam minus voluptate, voluptates laboriosam corrupti necessitatibus non nostrum illo asperiores maxime omnis soluta ad officia est quaerat? Itaque, quisquam mollitia qui ratione delectus, dignissimos dolor nam nesciunt voluptas eaque minus nihil nisi nemo obcaecati. Aspernatur pariatur ad, fugit possimus maxime reiciendis quasi magnam delectus corrupti sequi ut.",
//   // image:
//   //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tqi_bNibsSzK2Gv139JdZlcQ3JqSmUK26A&s",
//   tags: ["tag4", "tag5", "tag6"],
//   author: {
//     first_name: "Test",
//     last_name: "User 2",
//     image:
//       "https://st4.depositphotos.com/3538469/23945/v/450/depositphotos_239459018-stock-illustration-user-sign-icon-person-symbol.jpg",
//   },
//   likes: [
//     "67b8f92c0d594005d76503f9",
//     "67b8f92c0d594005d76503j5",
//     "67b8f92c0d594005d76503y4",
//   ],
//   comments: [],
//   createdAt: "2025-02-22T12:08:48.333Z",
//   updatedAt: "2025-02-22T12:08:48.333Z",
// }

export default function Home() {
  /*__________States and hooks___________*/
  const { token, id, first_name, last_name } = useSelector(
    (store) => store.auth
  );
  const { isLoading, isError, blogs } = useSelector((store) => store.allBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTag,setSearchTag] = useState("")
  const [heading,setHeading] = useState("Latest Blogs")
  /*_________Pure function___________ */
  function validateTag(str) {
    if (!str) return true;
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(str) 
  }
  function refreshFeed(){
    setHeading("Latest Blogs")
    dispatch(getAllBlogs(token))
  }
  function handleSeachByTag(event){
    event.preventDefault()
    dispatch(getBlogsByTag(token,searchTag))
    setHeading(`Showing blogs with #${searchTag}`)
  }
  /*___________useEffects____________ */
  useEffect(() => {
    document.title = "Home | panini 8 blogs";
    if (!token) navigate("/signin");
    if (token) dispatch(getAllBlogs(token));
  }, [token]);

  return (
    <main className="z-0 mt-15 pt-3 flex gap-4 px-20 h-[90vh] overflow-hidden">
      <section className="bg-white w-1/5 h-fit p-4 py-5 rounded-md flex flex-col gap-4 border border-slate-300 shadow-xl">
        <p className="text-primary text-2xl font-semibold text-center">
          Hello, {first_name} {last_name}
        </p>
        <NavLink to="/create-blog" className="w-fit">
          <button className="flex items-center gap-1 p-2 px-4 min-w-[75px] rounded-full border border-primary shadow-md hover:scale-110 transition-transform duration-200 ease-in-out">
            <p>Create Blog</p>
            <AddIcon />
          </button>
        </NavLink>

        <ul className="flex flex-col gap-2">
          <li>
            <button
              onClick={refreshFeed}
              className=" text-primary p-1 px-2 rounded-md border border-primary hover:scale-110 transition-transform duration-200 ease-in-out"
            >
              Refresh feed
            </button>
          </li>
          <li>
            <NavLink to="/profile">
              <p className="w-fit text-primary p-1 px-2 rounded-md border border-primary hover:scale-110 transition-transform duration-200 ease-in-out">
                My blogs
              </p>
            </NavLink>
          </li>
          <li className="flex flex-col gap-2">
            <p>Get blogs by tag</p>
            <form onSubmit={handleSeachByTag} className="flex flex-col gap-2">
              <input
                type="text"
                required
                value={searchTag}
                onChange={(e)=> validateTag(e.target.value)&&setSearchTag(e.target.value) }
                className="border border-slate-300 rounded-md py-1 px-2"
              />
              <button
                type="submit"
                className="bg-primary text-white py-1 px-2 rounded-full"
              >
                Search
              </button>
            </form>
          </li>
        </ul>
      </section>

      <section className="w-4/5 bg-white  rounded-md flex flex-col border border-slate-300 shadow-xl">
        <h2 className="text-3xl text-center text-primary font-semibold shadow-md p-2 ">
          {heading}
        </h2>

        <div className="blog-container relative m-2 mr-0 flex flex-col gap-4 overflow-y-auto h-full max-w-full">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))
          ) : blogs[0] ? (
            blogs.map((blog, index) => (
              <Blog blog={blog} userId={id} token={token} key={index} />
            ))
          ) : (
            <h3  className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 min-h-[200px] max-w-full text-red-500  text-4xl font-semibold  p-1">
              {isError ? isError : "No Blogs found"}
            </h3>
          )}
        </div>
      </section>
    </main>
  );
}
