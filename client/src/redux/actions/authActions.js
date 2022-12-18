import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';

export const register = data => dispatch => {
    dispatch({
        type: GLOBAL_TYPES.NOTIFY,
        payload: {loading: true}
    })

    axios.post("api/auth/register", data).then(res => {
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {success: res.data.msg}
        })

    }).catch(err => {
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    });
}


export const login = data => dispatch => {
    dispatch({
        type: GLOBAL_TYPES.NOTIFY,
        payload: {loading: true}
    })

    axios.post("api/auth/login", data).then(res => {
        console.log(res.data);

        localStorage.setItem("accessToken", res.data.access_token);
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {success: res.data.msg}
        });

        dispatch({
            type: GLOBAL_TYPES.LOGIN,
            payload: {
                user: res.data.user
            }
        })


    }).catch(err => {
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    });
}


export const refresh_token = () => dispatch => {
    dispatch({
        type: GLOBAL_TYPES.NOTIFY,
        payload: {loading: true}
    })

    axios.post("api/auth/refresh_token").then(res => {
        dispatch({
            type: GLOBAL_TYPES.LOGIN,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        });
        
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {}
        });

    }).catch(err => {
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    });
}



export const getMe = () => dispatch => {
    dispatch({
        type: GLOBAL_TYPES.NOTIFY,
        payload: {loading: true}
    })

    axios.get('api/auth/getme').then(res => {
        dispatch({
            type: GLOBAL_TYPES.LOGIN,
            payload: {
                user: res.data.user
            }
        });
        
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {}
        });

    }).catch(err => {
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    });
}


export const logout = (msg) => dispatch => {
    dispatch({
        type: GLOBAL_TYPES.NOTIFY,
        payload: {loading: true}
    });
    
    setTimeout(() => {
        localStorage.removeItem("accessToken");
    
        dispatch({
            type: GLOBAL_TYPES.LOGIN,
            payload: {}
        });
        
        const notify = (msg) ? {error: msg} : {};
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: notify
        });

        dispatch({type: GLOBAL_TYPES.RESET_POSTS, payload: null});
        dispatch({type: GLOBAL_TYPES.RESET_MESSENGER, payload: null});
    }, 1500)
}