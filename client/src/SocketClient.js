import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GLOBAL_TYPES from "./redux/actions/globalTypes";

const SocketClient = () => {
    const {auth, socket} = useSelector(state => state);
    const dispatch = useDispatch();

    //Connect
    useEffect(() => {
        socket.emit('joinUser', auth.user._id);

    }, [auth, socket]);


    //Like-Unlike posts/comments
    useEffect(() => {
        socket.on('likeUnlikeToClient', data => {
            const {newPost, user, action, type} = data;
            //console.log(data);
            dispatch({
                type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
                payload: newPost
            });
        
            dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
                newPost: newPost, 
                isMyPost: newPost.author._id === auth.user._id
            }});
        });

        return () => socket.off("likeUnlikeToClient");
    }, [socket]);


    //Create/Update posts
    useEffect(() => {
        socket.on('updatePostsToClient', data => {
            const {newPost, action} = data;
            console.log(data);
        
            dispatch({
                type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
                payload: newPost
            });
            dispatch({ type: GLOBAL_TYPES.UPDATE_POST, 
                payload: {
                    newPost: newPost, 
                    isMyPost: false
            }});
        });

        return () => socket.off("updatePostsToClient");
    }, [socket]);


    //Create/Update a comment
    useEffect(() => {
        socket.on('updateCommentsToClient', data => {
            const {newPost, newComment} = data;
            console.log(data);
            dispatch({
                type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
                payload: newPost
            });
        
            dispatch({type: GLOBAL_TYPES.UPDATE_POST_INORDER, payload: {
                newPost: newPost, 
                isMyPost: newPost.author._id === auth.user._id
            }});
        });

        return () => socket.off("updateCommentsToClient");
    }, [socket]);


    //Follow/Unfollow
    useEffect(() => {
        socket.on('followUnfollowToClient', data => {
            const {sender, action} = data;
            console.log(data);
            
            let newUser = null;
            if(action === 'followed')
                newUser = {...auth.user, followers: [...auth.user.followers, sender]}
            else{
                auth.user.followers = auth.user.followers.filter(user => 
                user._id !== sender._id);
                newUser = auth.user;
            }
            
            dispatch({type: GLOBAL_TYPES.LOGIN, 
                payload: {user: newUser }});
        });

        return () => socket.off("followUnfollowToClient");
    }, [socket]);



    return <> </>;
}

export default SocketClient;