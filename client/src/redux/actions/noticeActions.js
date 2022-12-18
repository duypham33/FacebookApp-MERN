import axios from 'axios';
import { logout } from './authActions';
import GLOBAL_TYPES from './globalTypes';


export const createNotify = (notify, auth, socket) => dispatch => {
    axios.post('api/notify/create', {notify: notify}).then(res => {
        
        res.data.notify.user = auth.user;
        socket.emit("onNotice", res.data.notify);
        
    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
    });
}


export const getNotify = () => dispatch => {
    axios.get('api/notify/getlist').then(res => {
        dispatch({
            type: GLOBAL_TYPES.GET_NOTICES,
            payload: res.data.notifies
        });
    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
    });
}

