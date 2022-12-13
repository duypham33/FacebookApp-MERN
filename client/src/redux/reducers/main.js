import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import notifyReducer from './NotifyReducer';
import themeReducer from './ThemeReducer';
import statusReducer from './StatusReducer';
import postReducer from './PostReducer';

export default combineReducers({
    auth: authReducer, 
    notify: notifyReducer,
    theme: themeReducer,
    status: statusReducer,
    post: postReducer
});