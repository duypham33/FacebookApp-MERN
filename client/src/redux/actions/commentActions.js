import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { logout } from './authActions';


export const createComment = (newComment, post, auth, socket) => async dispatch => {
    const newPost = {...post, comments: [...post.comments, newComment]};

    dispatch({
        type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
        payload: newPost
    });
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: newPost, 
        isMyPost: post.author._id === auth.user._id
    }});
    
    axios.post('api/comments/new', {
        newComment: newComment
    }).then(res => {
        newComment._id = res.data.commentID;
        
        dispatch({
            type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
            payload: newPost
        });

        dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
            newPost: newPost, 
            isMyPost: post.author._id === auth.user._id
        }});

        socket.emit("updateComments", {
            newPost: newPost,
            newComment: newComment,
            action: "created"
        });
        
    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    });
}

export const updateComment = (comment, post, content, auth, socket) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });

    comment.content = content;
    dispatch({
        type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
        payload: post
    });

    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: post, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/comments/${comment._id}/update`, {content: content}).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {success: res.data.msg} });
        
        socket.emit("updateComments", {
            newPost: post,
            newComment: comment,
            action: "updated"
        });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}


export const likeComment = (post, comment, auth, socket) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    
    comment.likes.push(auth.user);
    dispatch({
        type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
        payload: post
    });
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: post, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/comments/${comment._id}/like`).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
        socket.emit("likeUnlike", {
            newPost: post, 
            user: {_id: auth.user._id, username: auth.user.username},
            action: "liked",
            type: "comment",
            commenterId: comment.author._id
        });
    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}


export const unlikeComment = (post, comment, auth, socket) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    
    //const cm = post.comments.find(c => c._id === comment._id);
    comment.likes = comment.likes.filter(user => user._id !== auth.user._id);
    dispatch({
        type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
        payload: post
    });
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: post, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/comments/${comment._id}/unlike`).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
        socket.emit("likeUnlike", {
            newPost: post, 
            user: {_id: auth.user._id, username: auth.user.username},
            action: "unliked",
            type: "comment"
        });
    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}