import axios from 'axios';
import { logout } from './authActions';
import GLOBAL_TYPES from './globalTypes';


export const addUser = (user, message) => dispatch => {
    if(message.users.every(u => u._id !== user._id)){
        dispatch({type: GLOBAL_TYPES.ADD_USER, payload: {...user, text: '', media: []}});
    }
}

export const addMessage = ({msg, peer, auth, socket}) => async dispatch => {
    const socketData = {...auth.user, text: msg.text, media: msg.media, call: msg.call}
    
    //Not the first time chat, otherwise need to wait for the response data
    if(peer.conversation){
        dispatch({type: GLOBAL_TYPES.ADD_MESSAGE, payload: {
            peer: {...peer, text: msg.text, media: msg.media, call: msg.call}, 
            msg: msg
        }});

        socketData.conversation = peer.conversation;
    }

    try{
        const res = await axios.post(`api/messages/${msg.recipient}/create`, msg);
        
        if(!peer.conversation){
            dispatch({type: GLOBAL_TYPES.ADD_MESSAGE, payload: {
                peer: {...peer, text: msg.text, media: msg.media, 
                    call: msg.call, conversation: res.data.conversation}, 
                msg: msg
            }});

            socketData.conversation = res.data.conversation;
        }
        
        socket.emit("onMessage", {peer: socketData, msg: msg, receiverId: peer._id});
    } catch(err){
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
    }
}


export const getConversations = ({auth}) => dispatch => {
    axios.get(`api/messages/conversations`).then(res => {
        console.log(res.data);
        const resultUsers = res.data.conversations.length;
        let newUsers = [];

        if(resultUsers > 0){
            res.data.conversations.forEach(chat => {
                const {_id, recipients, text, media, call} = chat;
                const peer = recipients.find(user => user._id !== auth.user._id);

                newUsers.push({...peer, text: text, media: media, call: call, conversation: _id});
            })
        }

        dispatch({type: GLOBAL_TYPES.GET_CONVERSATIONS, 
            payload: {users: newUsers, resultUsers: resultUsers}});

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
    })
}


export const getMessages = ({auth, conversation, id}) => dispatch => {
    axios.get(`api/messages/get/${conversation}`).then(res => {
        dispatch({type: GLOBAL_TYPES.GET_MESSAGES, 
            payload: {_id: id, messages: res.data.messages, result: res.data.messages.length}});

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
    });
}

export const deleteMessages = ({msg, data, auth, socket}) => dispatch => {
    const messages = data.messages;
    data.messages = messages.filter(m => !(m.createdAt === msg.createdAt && m.sender === msg.sender));
    data.result--;

    dispatch({type: GLOBAL_TYPES.DELETE_MESSAGE, payload: data});

    axios.post(`api/messages/delete_message`, msg).then(res => {
        socket.emit("deleteMessage", {
            data: {...data, _id: msg.sender},
            receiverId: data._id
        });

    }).catch(err => {
        if(err.response.status === 401)
            dispatch(logout("Your session expired! Please, login again!"));
    });
}