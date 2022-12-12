import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import notifyReducer from './NotifyReducer';
import themeReducer from './ThemeReducer';

export default combineReducers({
    auth: authReducer, 
    notify: notifyReducer,
    theme: themeReducer
});