import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { logout } from './authActions';


export const createComment = (newComment, post, auth) => async dispatch => {
    dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {loading: true}})
    
    const newPost = {...post, comments: [...post.comments, newComment]};
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: newPost, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.post('api/comments/new', {
        newComment: newComment
    }).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, success: res.data.msg });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    });
}
