import axios from "axios";
import {
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_ERROR,
  LIKE_BLOG,
  UNLIKE_BLOG,
  POST_BLOG,
  DELETE_BLOG,
// EDIT_BLOG,
  GET_MY_BLOGS_REQUEST,
  GET_MY_BLOGS_SUCCESS,
  GET_MY_BLOGS_ERROR,
} from "./action.types";
import { openSnackbar } from "./actions";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function getAllBlogs(token) {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_BLOGS_REQUEST });
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/all-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_BLOGS_SUCCESS, payload: response.data.data });
      dispatch(openSnackbar("Blogs updated", "success"));
    } catch (error) {
      dispatch({
        type: GET_ALL_BLOGS_ERROR,
        payload: error.response?.data.message || error.message,
      });
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
    }
  };
}
export function postBlog(blog) {
  return (dispatch)=>{
    dispatch({type:POST_BLOG,payload:blog})
  }
}
export function likeBlog(blogId, userId) {
  return (dispatch) => {
    dispatch({ type: LIKE_BLOG, payload: { blogId, userId } });
  };
}
export function unlikeBlog(blogId, userId) {
  return (dispatch) => {
    dispatch({ type: UNLIKE_BLOG, payload: { blogId, userId } });
  };
}

export function getMyBlogs(token){
  return async (dispatch) => {
    dispatch({ type: GET_MY_BLOGS_REQUEST });
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/my-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_MY_BLOGS_SUCCESS, payload: response.data.data });
      dispatch(openSnackbar("Blogs updated", "success"));
    } catch (error) {
      dispatch({
        type: GET_MY_BLOGS_ERROR,
        payload: error.response?.data.message || error.message,
      });
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
    }
  };
}

export function deleteBlog(blogId){
  return (dispatch)=>{
    dispatch({type:DELETE_BLOG,payload:blogId})
  }
}