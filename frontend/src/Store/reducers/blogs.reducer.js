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
} from "../action.types";
const defaultState = {
  isLoading: false,
  isError: null,
  blogs: [],
};

export function allBlogsReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_ALL_BLOGS_REQUEST:
      case GET_BLOGS_BY_TAG_REQUEST:
      return (state = { ...state, isLoading: true, isError: null });
    case GET_ALL_BLOGS_SUCCESS:
      case GET_BLOGS_BY_TAG_SUCCESS:
      return (state = { isError: null, isLoading: false, blogs: payload });
    case GET_ALL_BLOGS_ERROR:
      case GET_BLOGS_BY_TAG_ERROR:
      return (state = {  isError: payload, isLoading: false,blogs:[] });
    case LIKE_BLOG: {
      const blogs = state.blogs.map((blog) => {
        if (blog._id.toString() === payload.blogId) {
          blog.likes.push(payload.userId);
          return blog;
        } else {
          return blog;
        }
      });
      return (state = { isError: null, isLoading: null, blogs });
    }
    case UNLIKE_BLOG: {
      const blogs = state.blogs.map((blog) => {
        if (blog._id.toString() === payload.blogId) {
          blog.likes = blog.likes.filter((userId) => userId !== payload.userId);

          return blog;
        } else {
          return blog;
        }
      });
      return (state = { isError: null, isLoading: null, blogs });
    }
    case POST_BLOG:
      return (state = {
        isError: null,
        isLoading: false,
        blogs: [payload, ...state.blogs],
      });
    default:
      return state;
  }
}

export function myBlogsReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_MY_BLOGS_REQUEST:
      return (state = { ...state, isLoading: true, isError: null });
    case GET_MY_BLOGS_SUCCESS:
      return (state = { isError: null, isLoading: false, blogs: payload });
    case GET_MY_BLOGS_ERROR:
      return (state = { ...state, isError: payload, isLoading: false });
    case DELETE_BLOG: {
      const blogs = state.blogs.filter((blog) => blog._id !== payload);
      return (state = { blogs, isLoading: false, isError: null });
    }
    case EDIT_BLOG: {
      const updatedBlogs = state.blogs.map((blog) =>
        blog._id.toString() === payload._id.toString() ? payload : blog
      );
      return (state = { isLoading: false, isError: null, blogs: updatedBlogs });
    }
    default:
      return state;
  }
}
