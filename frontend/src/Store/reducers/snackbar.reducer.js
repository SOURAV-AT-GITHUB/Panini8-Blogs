import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../action.types";
const defaultState = {
  isOpen: false,
  message: "Default mesage",
  severity: "info",
};
export default function snackbarReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case OPEN_SNACKBAR:
      return state ={...state,isOpen:true,...payload}
    case CLOSE_SNACKBAR:
        return state = {...state,isOpen:false}
    default:
     return state
  }
}
