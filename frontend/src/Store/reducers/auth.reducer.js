import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_SIGN_OUT,
} from "../action.types";
const defaultAuthState = {
  token: null,
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  isLoading: false,
  isError: null,
};
export default function authReducer(
  state = JSON.parse(localStorage.getItem("auth")) || defaultAuthState,
  { type, payload }
) {
  switch (type) {
    case AUTH_REQUEST:
      return (state = { ...defaultAuthState, isLoading: true, isError: null });
    case AUTH_SUCCESS:{
      localStorage.setItem('auth',JSON.stringify(payload))
      return (state = { isLoading: false, isError: null, ...payload });}
    case AUTH_FAILED:
      return (state = {
        ...defaultAuthState,
        isLoading: false,
        isError: payload,
      });
    case AUTH_SIGN_OUT:{
      localStorage.removeItem('auth')
      return (state = defaultAuthState);}
    default:
      return state;
  }
}
