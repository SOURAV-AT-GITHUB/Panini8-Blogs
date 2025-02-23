import { useSelector } from "react-redux";
import logo from "/Other-files/logo.webp";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function Navbar() {
  const auth = useSelector((store) => store.auth);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const isMediumScreen = useMediaQuery("(max-width:768px)");
  return (
    <nav className="fixed z-10 w-full h-[8vh] left-0 top-0 bg-white shadow-md p-2 pr-px px-5 md:px-16 flex items-center justify-between">
      <NavLink to="/">
        <div className="flex items-center hover:scale-105 transition-transform duration-200 ease-in-out">
          <img src={logo} alt="logo" className="h-12" />
          <p className="text-[1.65rem] text-primary font-extrabold">blogs</p>
        </div>
      </NavLink>
      <div className="hidden md:flex items-center justify-between gap-6 text-lg">
        {auth.token ? (
          <>
            <NavLink to="/">
              <p
                className={`${
                  location.pathname === "/" && "text-primary"
                } hover:scale-110 transition-transform duration-200 ease-in-out`}
              >
                Home
              </p>
            </NavLink>
            <NavLink to="/profile">
              <p
                className={`${
                  location.pathname === "/profile" && "text-primary"
                } hover:scale-110 transition-transform duration-200 ease-in-out`}
              >
                Profile
              </p>
            </NavLink>
            <NavLink to="/create-blog">
              <p
                className={`${
                  location.pathname === "/create-blog" && "text-primary"
                } hover:scale-110 transition-transform duration-200 ease-in-out`}
              >
                Create Blog
              </p>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signin">
              <button className=" bg-primary text-white p-1 px-5 rounded-3xl hover:scale-105 transition-transform duration-200 ease-in-out">
                Sing In
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className=" text-primary border border-primary p-1 px-5 rounded-3xl hover:scale-105 transition-transform duration-200 ease-in-out">
                Sing Up
              </button>
            </NavLink>
          </>
        )}
      </div>
      <button onClick={openDrawer} className="md:hidden text-primary">
        <MenuIcon fontSize="large" />
      </button>

      <Drawer
        open={isMediumScreen && open}
        anchor="right"
        onClose={closeDrawer}
      >
        <div className="min-w-[60vw] bg-white flex flex-col items-center gap-4">
          <button onClick={closeDrawer} className="self-start p-1 h-fit">
            <CloseIcon fontSize="large" />
          </button>
          <NavLink to="/" onClick={closeDrawer}>
            <div className="flex items-center hover:scale-105 transition-transform duration-200 ease-in-out">
              <img src={logo} alt="logo" className="h-12" />
              <p className="text-[1.65rem] text-primary font-extrabold">
                blogs
              </p>
            </div>
          </NavLink>
          <div className="flex flex-col items-center justify-between gap-6 text-lg">
            {auth.token ? (
              <>
                <NavLink
                  to="/create-blog"
                  className="w-fit"
                  onClick={closeDrawer}
                >
                  <button className="flex items-center gap-1 p-2 px-4 min-w-[75px] rounded-full border border-primary shadow-md hover:scale-110 transition-transform duration-200 ease-in-out">
                    <p>Create Blog</p>
                    <AddIcon />
                  </button>
                </NavLink>
                <NavLink to="/" onClick={closeDrawer}>
                  <p
                    className={`${
                      location.pathname === "/" && "text-primary"
                    } hover:scale-110 transition-transform duration-200 ease-in-out`}
                  >
                    Home
                  </p>
                </NavLink>
                <NavLink to="/profile" onClick={closeDrawer}>
                  <p
                    className={`${
                      location.pathname === "/profile" && "text-primary"
                    } hover:scale-110 transition-transform duration-200 ease-in-out`}
                  >
                    Profile
                  </p>
                </NavLink>
                <NavLink to="/profile" onClick={closeDrawer}>
                  <p className={`${
                      location.pathname === "/profile" && "text-primary"
                    } hover:scale-110 transition-transform duration-200 ease-in-out`}>
                    My blogs
                  </p>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signin" onClick={closeDrawer}>
                  <button className=" bg-primary text-white p-1 px-5 rounded-3xl hover:scale-105 transition-transform duration-200 ease-in-out">
                    Sing In
                  </button>
                </NavLink>
                <NavLink to="/signup" onClick={closeDrawer}>
                  <button className=" text-primary border border-primary p-1 px-5 rounded-3xl hover:scale-105 transition-transform duration-200 ease-in-out">
                    Sing Up
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
