import { useSelector } from "react-redux";
import logo from "/Other-files/logo.webp";
import { NavLink, useLocation } from "react-router-dom";
export default function Navbar() {
    const auth = useSelector(store=>store.auth)
    const location = useLocation()

  return (
    <nav className="fixed z-10 w-full h-[8vh] left-0 top-0 bg-white shadow-md p-2 px-16 flex items-center justify-between">
        <NavLink to="/">
      <div className="flex items-center hover:scale-105 transition-transform duration-200 ease-in-out">
        <img src={logo} alt="logo" className="h-12" />
        <p className="text-[1.65rem] text-primary font-extrabold">blogs</p>
      </div>
        </NavLink>
      <div className="flex items-center justify-between gap-6 text-lg">
{   auth.token ?     <>
        <NavLink to='/'><p className={`${location.pathname === '/' && 'text-primary'} hover:scale-110 transition-transform duration-200 ease-in-out`}>Home</p></NavLink>
        <NavLink to='/profile'><p className={`${location.pathname === '/profile' && 'text-primary'} hover:scale-110 transition-transform duration-200 ease-in-out`}>Profile</p></NavLink>
        <NavLink to='/create-blog'><p className={`${location.pathname === '/create-blog' && 'text-primary'} hover:scale-110 transition-transform duration-200 ease-in-out`}>Create Blog</p></NavLink>
        </>
        :
        <>
        <NavLink to="/signin">
        <button className=" bg-primary text-white p-1 px-5 rounded-3xl hover:scale-105 transition-transform duration-200 ease-in-out">Sing In</button>
        </NavLink>
        <NavLink to="/signup">
        <button className=" text-primary border border-primary p-1 px-5 rounded-3xl hover:scale-105 transition-transform duration-200 ease-in-out">Sing Up</button>
        </NavLink>
        </>}
      </div>
    </nav>
  );
}
