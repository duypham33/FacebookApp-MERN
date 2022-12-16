import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { logout } from './authActions';


export const createComment = (newComment, post, auth) => async dispatch => {
    const newPost = {...post, comments: [...post.comments, newComment]};
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: newPost, 
        isMyPost: post.author._id === auth.user._id
    }});
    
    axios.post('api/comments/new', {
        newComment: newComment
    }).then(res => {
        newComment._id = res.data.commentID;
        dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
            newPost: newPost, 
            isMyPost: post.author._id === auth.user._id
        }});
        
    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    });
}

export const updateComment = (comment, post, content, auth) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });

    comment.content = content;
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: post, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/comments/${comment._id}/update`, {content: content}).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {success: res.data.msg} });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}


export const likeComment = (post, comment, auth) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    
    //const cm = post.comments.find(c => c._id === comment._id);
    comment.likes.push(auth.user);
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: post, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/comments/${comment._id}/like`).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}


export const unlikeComment = (post, comment, auth) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    
    //const cm = post.comments.find(c => c._id === comment._id);
    comment.likes = comment.likes.filter(user => user._id !== auth.user._id);
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: post, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/comments/${comment._id}/unlike`).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}