const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, ref: 'user'},
    content: {
        type: String,
        trim: true,
        maxlength: 1000,
        required: true
    },
    tags: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    postId: mongoose.Types.ObjectId,
    reply: mongoose.Types.ObjectId
    
}, {
    timestamps: true
});


module.exports = mongoose.model('comment', commentSchema);