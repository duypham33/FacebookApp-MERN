
let consumersMap = {};

const SocketServer = socket => {
    //Connect
    socket.on('joinUser', user => {
        const {_id, followers} = user;
        consumersMap[_id] = {followers: followers, socketId: socket.id};
    });

    //Disconnect
    socket.on('disconnect', () => {
        for(const [userId, value] of Object.entries(consumersMap)){
            if(value && value.socketId === socket.id){
                
                //If having a call, inform the other disconnection
                if(value.call && consumersMap[value.call]){
                    socket.to(`${consumersMap[value.call].socketId}`).emit("callerDisconnect");
                    consumersMap[value.call].call = null;
                }

                //Inform the followers know the user was offline
                const followers = value.followers;
                if(followers.length > 0){
                    followers.forEach(u => {
                        console.log(u);
                        if(consumersMap[u._id])
                            socket.to(`${consumersMap[u._id].socketId}`).
                            emit('checkOffOnlineToClient', userId);
                    })
                }
                
                consumersMap[userId] = null;
                break;
            }
        }
        
        //console.log(consumersMap);
    })

    //Like-Unlike posts/comments
    socket.on('likeUnlike', data => {
        const author = data.newPost.author;
        const userId = data.user._id;
        const receiversId = [...author.followers, author._id];
        
        receiversId.forEach(id => {
            if(id !== userId && consumersMap[id])
                socket.to(`${consumersMap[id].socketId}`).emit('likeUnlikeToClient', data);
        });
    })
    
    //Create/Update a post
    socket.on('updatePosts', data => {
        console.log(data);
        const author = data.newPost.author;
        const userId = author._id;
        const receiversId = author.followers;
        
        receiversId.forEach(id => {
            if(id !== userId && consumersMap[id])
                socket.to(`${consumersMap[id].socketId}`).emit('updatePostsToClient', data);
        });
    })


    //Create/Update a comment
    socket.on('updateComments', data => {
        const postAuthor = data.newPost.author;
        const userId = data.newComment.author._id;
        const receiversId = [...postAuthor.followers, postAuthor._id];
        
        receiversId.forEach(id => {
            if(id !== userId && consumersMap[id])
                socket.to(`${consumersMap[id].socketId}`).emit('updateCommentsToClient', data);
        });
    })

    //Follow/Unfollow
    socket.on('follow', data => {
        const {receiverId} = data;
        if(consumersMap[receiverId])
            socket.to(`${consumersMap[receiverId].socketId}`).emit('followUnfollowToClient', data);
    })

    //Notice
    socket.on('onNotice', notice => {
        notice.recipients.forEach(id => {
            if(consumersMap[id])
                socket.to(`${consumersMap[id].socketId}`).emit('noticeToClient', notice);
        });
    })

    //Messages
    socket.on('onMessage', ({peer, msg, receiverId}) => {
        if(consumersMap[receiverId])
            socket.to(`${consumersMap[receiverId].socketId}`).emit('messageToClient', {peer, msg});
    })

    //Delete a message
    socket.on('deleteMessage', ({data, receiverId}) => {
        if(consumersMap[receiverId])
            socket.to(`${consumersMap[receiverId].socketId}`).emit('deleteMessageToClient', data);
    })

    //Check online
    socket.on('checkOnline', user => {
        const {following, followers} = user;
        //First, get online users from following
        const onlines = following.filter(u => consumersMap[u._id]);
        socket.emit("checkOnlineToMe", onlines);
        
        //Then, inform for followers know the user is online
        if(followers.length > 0){
            followers.forEach(u => {
                if(consumersMap[u._id])
                    socket.to(`${consumersMap[u._id].socketId}`).emit('checkOnlineToClient', user._id);
            })
        }
        
    })

    //Call
    socket.on("callUser", data => {
        const {sender, recipient} = data;
        consumersMap[sender].call = recipient;
        console.log(data)
        if(consumersMap[recipient]){
            if(consumersMap[recipient].call)  //Calling with another
                socket.emit("busyToMe");
            
            else{
                socket.to(`${consumersMap[recipient].socketId}`).emit("callToClient", data);
                consumersMap[recipient].call = sender;
            }
        }
    })


    socket.on("endCall", data => {
        const {sender, recipient} = data;
        
        if(consumersMap[recipient]){
            socket.to(`${consumersMap[recipient].socketId}`).emit("endCallToClient", data);
            consumersMap[recipient].call = null;
        }
        
        if(consumersMap[sender]){
            socket.to(`${consumersMap[sender].socketId}`).emit("endCallToClient", data);
            consumersMap[sender].call = null;
        }
    })
}

module.exports = SocketServer;