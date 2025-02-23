import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import CreateBlog from "./Pages/Create-Blog/CreateBlog";
import SignIn from "./Pages/Auth/SignIn";
import Signup from "./Pages/Auth/Signup";
import HomeRedirect from "./Pages/HomeRedirect";
import { Alert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {  closeSnackbar } from "./Store/actions";
import SingleBlog from "./Pages/Create-Blog/SingleBlog";
function App() {
  const location = useLocation()
  const { isOpen, message, severity } = useSelector((store) => store.snackbar);
  const dispatch = useDispatch();
  return (
    <>
    {(location.pathname !=='/signin' && location.pathname !=='/signup') &&  <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blog/:blog_id" element={<SingleBlog />} />
        <Route path="*" element={<HomeRedirect />} />

      </Routes>
      <Snackbar
              open={isOpen}
              onClose={() => dispatch(closeSnackbar())}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={severity}>{message}</Alert>
            </Snackbar>
    </>
  );
}

export default App;
