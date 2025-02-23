import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyBlogs } from "../../Store/blogs.action";
import BlogWithActions from "../../components/BlogWithActions";
const dummyImage =
  "https://st4.depositphotos.com/3538469/23945/v/450/depositphotos_239459018-stock-illustration-user-sign-icon-person-symbol.jpg";
export default function Profile() {
  /*___________states and hooks */
  const { token, first_name, last_name, email, gender } = useSelector(
    (store) => store.auth
  );
  const { isLoading, isError, blogs } = useSelector((store) => store.myBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*___________Pure functions___________ */


  /*___________useEffects____________ */
  useEffect(() => {
    document.title = "Profile | panini 8 blogs";
    if (!token) navigate("/signin");
    if (token) dispatch(getMyBlogs(token));
  }, [token]);
  return (
    <main className="z-0 mt-15 pt-3 flex flex-col sm:flex-row gap-4 sm:px-20 min-h-[90vh] ">
      <section className="bg-white sm:w-1/4 h-fit p-4 py-5 rounded-md flex flex-col gap-4 border border-slate-300 shadow-xl">
        <img
          src={dummyImage}
          alt={`${first_name} ${last_name}`}
          className="rounded-full"
        />
        <p className="text-primary text-2xl font-semibold text-center">
          {first_name} {last_name}
        </p>

        <ul className="flex flex-col gap-2">
          <li>
            <p>Email : {email}</p>
          </li>
          <li>
            <p>Gender : {gender}</p>
          </li>
        </ul>
      </section>

      <section className="sm:w-3/4 bg-white  rounded-md flex flex-col border border-slate-300 shadow-xl">
        <h2 className="text-3xl text-center text-primary font-semibold shadow-md p-2 ">
          My Blogs
        </h2>
        <div className="blog-container m-2 mr-0 flex flex-col gap-4 overflow-y-auto  ">
          {blogs.map((blog, index) => (
            <BlogWithActions blog={blog} token={token} key={index}/>
          ))}
        </div>
      </section>
    </main>
  );
}
