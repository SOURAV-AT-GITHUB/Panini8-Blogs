import { useSelector } from "react-redux";
import logo from "/Other-files/logo.webp";
import { NavLink, useLocation } from "react-router-dom";
export default function Navbar() {
    const auth = useSelector(store=>store.auth)
    const location = useLocation()

  return (
    <nav className="fixed z-10 w-full left-0 top-0 bg-white shadow-2xl p-2 px-16 flex items-center justify-between">
        <NavLink to="/">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-14" />
        <p className="text-3xl text-primary font-extrabold">blogs</p>
      </div>
        </NavLink>
      <div className="flex items-center justify-between gap-4 text-lg">
{   auth.token ?     <>
        <NavLink to='/'><p className={`${location.pathname === '/' && 'text-primary'}`}>Home</p></NavLink>
        <NavLink to='/profile'><p className={`${location.pathname === '/profile' && 'text-primary'}`}>Profile</p></NavLink>
        <NavLink to='/create-blog'><p className={`${location.pathname === '/create-blog' && 'text-primary'}`}>Create Blog</p></NavLink>
        </>
        :
        <>
        <NavLink to="/signin">
        <button className="cursor-pointer bg-primary text-white p-1 px-5 rounded-3xl">Sing In</button>
        </NavLink>
        <NavLink to="/signup">
        <button className="cursor-pointer text-primary border border-primary p-1 px-5 rounded-3xl">Sing Up</button>
        </NavLink>
        </>}
      </div>
    </nav>
  );
}
