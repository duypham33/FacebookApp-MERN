import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import notifyReducer from './NotifyReducer';
import themeReducer from './ThemeReducer';
import statusReducer from './StatusReducer';
import postReducer from './PostReducer';
import suggestionReducer from "./SuggestionsReducer";
import socketReducer from "./SocketReducer";
import noticeReducer from './NoticeReducer';
import messengerReducer from "./MessengerReducer";
import onlineReducer from "./OnlineReducer";

export default combineReducers({
    auth: authReducer, 
    notify: notifyReducer,
    theme: themeReducer,
    status: statusReducer,
    post: postReducer,
    suggestions: suggestionReducer,
    socket: socketReducer,
    notices: noticeReducer,
    message: messengerReducer,
    online: onlineReducer
});