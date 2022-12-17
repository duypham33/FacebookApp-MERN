
let consumers = [];

const SocketServer = socket => {
    //Connect
    socket.on('joinUser', id => {
        const consumer = consumers.find(consumer => consumer.userId === id);
        if(consumer)
            consumer.socketId = socket.id;
        else
            consumers.push({userId: id, socketId: socket.id});
        
        //console.log(consumers);
    });

    //Disconnect
    socket.on('disconnect', () => {
        consumers = consumers.filter(consumer => consumer.socketId !== socket.id);
    })

    //Like-Unlike posts/comments
    socket.on('likeUnlike', data => {
        //console.log(data)
        //console.log(consumers);
        const author = data.newPost.author;
        const userId = data.user._id;
        const receiversId = [...author.followers, author._id];
        const receivers = consumers.filter(consumer => 
            consumer.userId !== userId && receiversId.includes(consumer.userId));
        //console.log(receiversId);
        //console.log(receivers);

        if(receivers.length > 0)
            receivers.forEach(receiver => 
                socket.to(`${receiver.socketId}`).emit('likeUnlikeToClient', data));
    })
    
    //Create/Update a post
    socket.on('updatePosts', data => {
        console.log(data);
        const author = data.newPost.author;
        const userId = author._id;
        const receiversId = author.followers;
        const receivers = consumers.filter(consumer => 
            consumer.userId !== userId && receiversId.includes(consumer.userId));
        //console.log(receiversId);

        if(receivers.length > 0)
            receivers.forEach(receiver => 
                socket.to(`${receiver.socketId}`).emit('updatePostsToClient', data));
    })


    //Create/Update a comment
    socket.on('updateComments', data => {
        //console.log(data)
        const postAuthor = data.newPost.author;
        const userId = data.newComment.author._id;
        const receiversId = [...postAuthor.followers, postAuthor._id];
        
        const receivers = consumers.filter(consumer => 
            consumer.userId !== userId && receiversId.includes(consumer.userId));
        //console.log(receiversId);

        if(receivers.length > 0)
            receivers.forEach(receiver => 
                socket.to(`${receiver.socketId}`).emit('updateCommentsToClient', data));
    })

    //Follow/Unfollow
    socket.on('follow', data => {
        const {receiverId} = data;
        const receiver = consumers.find(consumer => consumer.userId === receiverId);
        if(receiver)
            socket.to(`${receiver.socketId}`).emit('followUnfollowToClient', data);
    })
}

module.exports = SocketServer;