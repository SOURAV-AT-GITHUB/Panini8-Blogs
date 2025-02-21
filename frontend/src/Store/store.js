import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./reducers/auth.reducer";
import {thunk} from 'redux-thunk'
import snackbarReducer from "./reducers/snackbar.reducer";
const rootReducer = combineReducers({
    auth:authReducer,
    snackbar:snackbarReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))