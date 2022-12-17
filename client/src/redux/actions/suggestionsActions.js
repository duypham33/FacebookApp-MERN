import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { logout } from './authActions';


export const getSuggestions = (auth) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.LOAD_SUGGESTIONS, payload: true });
    
    axios.get(`api/users/${auth.user._id}/suggestions`).then(res => {
        dispatch({ type: GLOBAL_TYPES.SUGGESTIONS, payload: res.data.users });
        dispatch({ type: GLOBAL_TYPES.LOAD_SUGGESTIONS, payload: false });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));

        dispatch({ type: GLOBAL_TYPES.LOAD_SUGGESTIONS, payload: false });
    })
}