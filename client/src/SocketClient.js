import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GLOBAL_TYPES from "./redux/actions/globalTypes";

const SocketClient = () => {
    const {auth, socket, online, call} = useSelector(state => state);
    const dispatch = useDispatch();

    //Connect
    useEffect(() => {
        socket.emit('joinUser', auth.user);

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



    //Notice
    useEffect(() => {
        socket.on('noticeToClient', notice => {
            console.log(notice);
            dispatch({type: GLOBAL_TYPES.CREATE_NOTICE, payload: notice});
        });

        return () => socket.off('noticeToClient');
    }, [socket]);


    //Message
    useEffect(() => {
        socket.on('messageToClient', data => {
            console.log(data);
            dispatch({type: GLOBAL_TYPES.ADD_MESSAGE, payload: data});
        });

        return () => socket.off('messageToClient');
    }, [socket]);


    //Delete a message
    useEffect(() => {
        socket.on('deleteMessageToClient', data => {
            console.log(data);
            dispatch({type: GLOBAL_TYPES.DELETE_MESSAGE, payload: data});
        });

        return () => socket.off('deleteMessageToClient');
    }, [socket]);


    //Check online offline status
    useEffect(() => {
        socket.emit('checkOnline', auth.user);

    }, [socket, auth]);
    
    
    useEffect(() => {
        socket.on('checkOnlineToMe', onlines => {
            console.log('checkOnlineToMe', onlines);
            
            onlines.map(user => dispatch({type: GLOBAL_TYPES.ONLINE, payload: user._id}));
        });

        return () => socket.off('checkOnlineToMe');
    }, [socket, auth]);



    useEffect(() => {
        socket.on('checkOnlineToClient', userId => {
            dispatch({type: GLOBAL_TYPES.ONLINE, payload: userId});

        });

        return () => socket.off('checkOnlineToClient');
    }, [socket, auth]);



    useEffect(() => {
        socket.on('checkOffOnlineToClient', userId => {
            dispatch({type: GLOBAL_TYPES.OFFLINE, payload: userId});
            
        });

        return () => socket.off('checkOffOnlineToClient');
    }, [socket, auth]);



    //Call
    useEffect(() => {
        socket.on("busyToMe", () => {
            setTimeout(() => {
                dispatch({type: GLOBAL_TYPES.CALL, payload: null});

                dispatch({type: GLOBAL_TYPES.NOTIFY, 
                payload: {error: `${call.username} is busy!`}});
            }, 2500);
        });

        return () => socket.off('busyToMe');
    }, [socket, call]);

    useEffect(() => {
        socket.on("callToClient", data => {
            dispatch({type: GLOBAL_TYPES.CALL, payload: data});
        });

        return () => socket.off('callToClient');
    }, [socket, call]);

    return <> </>;
}

export default SocketClient;