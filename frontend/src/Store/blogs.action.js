import axios from "axios";
import {
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_ERROR,
  LIKE_BLOG,
  UNLIKE_BLOG,
  POST_BLOG,
  DELETE_BLOG,
  EDIT_BLOG,
  GET_MY_BLOGS_REQUEST,
  GET_MY_BLOGS_SUCCESS,
  GET_MY_BLOGS_ERROR,
  GET_BLOGS_BY_TAG_REQUEST,
  GET_BLOGS_BY_TAG_SUCCESS,
  GET_BLOGS_BY_TAG_ERROR,
} from "./action.types";
import { openSnackbar } from "./actions";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//___________Global and local action functions
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
export function getMyBlogs(token) {
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
export function getBlogsByTag(token, tag) {
  return async (dispatch) => {
    dispatch({ type: GET_BLOGS_BY_TAG_REQUEST });
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/blog-by-tag/${tag}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(openSnackbar(response.data.message, "success"));
      dispatch({ type: GET_BLOGS_BY_TAG_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
      dispatch({
        type: GET_BLOGS_BY_TAG_ERROR,
        payload: error.response?.data.message || error.message,
      });
    }
  };
}
//________Only local action functions
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
export function postBlog(blog) {
  return (dispatch) => {
    dispatch({ type: POST_BLOG, payload: blog });
  };
}
export function deleteBlog(blogId) {
  return (dispatch) => {
    dispatch({ type: DELETE_BLOG, payload: blogId });
  };
}
export function editBlog(updatedBlog) {
  return (dispatch) => {
    dispatch({ type: EDIT_BLOG, payload: updatedBlog });
  };
}
