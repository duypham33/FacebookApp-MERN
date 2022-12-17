import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import { logout } from './authActions';


export const getPosts = () => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    
    axios.get('api/posts').then(res => {
        dispatch({type: GLOBAL_TYPES.GET_POSTS, payload: res.data});
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));

        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}



export const createPost = ({content, images, auth}) => async dispatch => {
    let media = [];
    try {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
        if(images.length > 0) 
            media = await imageUpload(images);
        
        const res = await axios.post(`api/posts/${auth.user._id}/create`, {
            content: content,
            images: media
        });

        dispatch({ 
            type: GLOBAL_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, author: auth.user }
        })

        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {success: res.data.msg} });

    } catch (err) {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else{
            dispatch({
                type: GLOBAL_TYPES.NOTIFY,
                payload: {error: err.response.data.msg}
            })
        }
    }
}



export const updatePost = ({content, images, auth, status}) => async dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    let media = [];
    const imgNewUrl = images.filter(img => !img.url);
    const imgOldUrl = images.filter(img => img.url);

    if(status.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        if(imgNewUrl.length > 0) 
            media = await imageUpload(imgNewUrl);

        const res = await axios.patch(`api/posts/${status._id}/update`, {
            content: content,
            images: [...imgOldUrl, ...media] 
        });

        dispatch({
            type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
            payload: res.data.updatedPost
        });
        dispatch({ type: GLOBAL_TYPES.UPDATE_POST, payload: res.data.updatedPost });

        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {success: res.data.msg} });
    } catch (err) {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else{
            dispatch({
                type: GLOBAL_TYPES.NOTIFY,
                payload: {error: err.response.data.msg}
            })
        }
    }
}


export const LikePost = (post, auth) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    const newPost = {...post, likes: [...post.likes, auth.user]};
    dispatch({
        type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
        payload: newPost
    });

    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: newPost, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/posts/${post._id}/like`).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}


export const UnLikePost = (post, auth) => dispatch => {
    dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: true} });
    const newPost = {...post, likes: post.likes.filter(user => user._id !== auth.user._id)};
    
    dispatch({
        type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
        payload: newPost
    });
    dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
        newPost: newPost, 
        isMyPost: post.author._id === auth.user._id
    }});

    axios.patch(`api/posts/${post._id}/unlike`).then(res => {
        dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
        else
            dispatch({ type: GLOBAL_TYPES.NOTIFY, payload: {loading: false} });
    })
}