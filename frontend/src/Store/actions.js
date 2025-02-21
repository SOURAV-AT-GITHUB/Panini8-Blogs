import axios from "axios";
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_SIGN_OUT,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
} from "./action.types";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export function openSnackbar(message = "Default message", severity = "info") {
  return (dispatch) => {
    dispatch({ type: OPEN_SNACKBAR, payload: { message, severity } });
  };
}
export function closeSnackbar() {
  return (dispatch) => {
    dispatch({ type: CLOSE_SNACKBAR });
  };
}

export function handleSingIn(email, password,navigate) {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST });
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        email,
        password,
      });
      dispatch({ type: AUTH_SUCCESS, payload: response.data.data });
      dispatch(
        openSnackbar(`Welcome back ${response.data.data.first_name}`, "success")
      );
    } catch (error) {
      
      dispatch(openSnackbar(error.response?.data.message || error.message, "error"));
      dispatch({ type: AUTH_FAILED, payload: error.message });
      if(error.status === 404) navigate('/signup')
    }
  };
}
export function handleSingOut() {
  return (dispatch) => {
    dispatch({ type: AUTH_SIGN_OUT });
  };
}
