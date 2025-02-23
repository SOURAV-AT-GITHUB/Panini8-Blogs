import { useEffect, useState } from "react";
import logo from "/Other-files/logo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../../Store/actions";
import {handleSingIn} from '../../Store/actions'
import { CircularProgress } from "@mui/material";
export default function SignIn() {
    /*___________States and hooks___________ */
  const {token,isLoading} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData] = useState({email:"",password:""})
/*_____________async functions__________ */
const handleSubmit = async (event)=>{
  event.preventDefault()
  dispatch(handleSingIn(formData.email,formData.password,navigate))
}
    /*_______useEffects___________ */
    useEffect(() => {
      if (token) navigate("/");
          document.title = "Sign In | panini 8 blogs"
    }, [token,navigate]);
  return (
    <main id="signin-container" className="relative min-h-screen">
      <div className="absolute left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 w-full max-w-[450px] m-auto flex items-center justify-center rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="flex flex-col items-center gap-4 w-full p-8">
          <NavLink to="/">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-14" />
              <p className="text-3xl text-primary font-extrabold">blogs</p>
            </div>
          </NavLink>
          <p className="text-[2rem] font-bold text-center">
            Welcome to <span className="text-primary">Intresting Blogs</span>
          </p>

          <div
            className="flex items-center justify-center gap-4 w-full border border-slate-300 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
            onClick={() =>
              dispatch(openSnackbar("Feature is not live yet.", "warning"))
            }
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFUTi1RsVDFSupmzDUJ5I3ZHBtwz043rbHQ&s"
              alt="google"
              className="w-8"
            />
            <p>Sign In with Google</p>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="w-1/4 h-px bg-slate-400"></div>
            <div className="w-2/4 text-center text-slate-400">
              or continue with email
            </div>
            <div className="w-1/4 h-px bg-slate-400"></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="flex flex-col gap-1 w-full">
              <p className="text-slate-400">Email *</p>
              <input
                type="email"
                required
                className="border border-slate-400 rounded-sm w-full p-2"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <p className="text-slate-400">Password *</p>
              <input
                type="password"
                minLength={6}
                required
                className="border border-slate-400 rounded-sm w-full p-2"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full p-2 rounded-full"
            >
              {isLoading ? (
                              <CircularProgress color="" />
                            ) : (
                              <p className="font-bold">Sign In</p>
                            )}
            </button>
          </form>
          <div className="text-lg font-medium flex items-center gap-2 ">
            <p>Don’t have an account?</p>
            <NavLink to="/signup">
              <p className="text-primary">Sing Up</p>
            </NavLink>
          </div>
          <p className="text-center">We never share your information with anyone, we only collect information to suggest relevant content</p>
        </div>
      </div>
    </main>
  );
}
