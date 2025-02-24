import { useEffect, useState } from "react";
import logo from "/Other-files/logo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../../Store/actions";
import CircularProgress from "@mui/material/CircularProgress";
export default function Signup() {
  /*___________States and hooks___________ */
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  /*________async functions__________ */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
     await axios.post(`${BACKEND_URL}/user/signup`, formData);
      dispatch(openSnackbar("Sign up success, please sign in.", "success"));
      navigate("/signin");
    } catch (error) {
      dispatch(openSnackbar(error.response?.data.message||error.message, "error"));
      if(error.status === 400) navigate ('/signin')
    } finally {
      setIsLoading(false);
    }
  };
  /*_______useEffects___________ */
  useEffect(() => {
    if (token) navigate("/");
              document.title = "Sign Up | panini 8 blogs"
  }, [token, navigate]);
  return (
    <main id="signup-container" className="relative min-h-screen">
      <div className="absolute left-2/4 -translate-x-2/4 top-20 w-full max-w-[450px] m-auto flex items-center justify-center rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="flex flex-col items-center gap-4 w-full p-8 ">
          <NavLink to="/">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-14" />
              <p className="text-3xl text-primary font-extrabold">blogs</p>
            </div>
          </NavLink>
          <p className="text-[2rem] font-bold text-center">
            Create Your <span className="text-primary">Account</span>
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
            <p>Sign Up with Google</p>
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
              <p className="text-slate-400">First name *</p>
              <input
                type="text"
                minLength={2}
                required
                className="border border-slate-400 rounded-sm w-full p-2"
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-slate-400">Last name *</p>
              <input
                type="text"
                minLength={2}
                required
                className="border border-slate-400 rounded-sm w-full p-2"
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-slate-400">Gender *</p>
              <select
                required
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border border-slate-400 rounded-sm w-full p-2"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
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
              className="bg-primary text-white w-full p-2 rounded-full "
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress color="" />
              ) : (
                <p className="font-bold">Sign Up</p>
              )}
            </button>
          </form>
          <div className="text-lg font-medium flex items-center gap-2 ">
            <p>Already have an account ?</p>
            <NavLink to="/signin">
              <p className="text-primary">Sing In</p>
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}
