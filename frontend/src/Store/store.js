import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./reducers/auth.reducer";
import {thunk} from 'redux-thunk'
import snackbarReducer from "./reducers/snackbar.reducer";
import {allBlogsReducer, myBlogsReducer} from "./reducers/blogs.reducer";
const rootReducer = combineReducers({
    auth:authReducer,
    snackbar:snackbarReducer,
    allBlogs:allBlogsReducer,
    myBlogs:myBlogsReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))