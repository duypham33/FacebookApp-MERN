const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, ref: 'user'},
    content: {
        type: String,
        trim: true,
        maxlength: 2500
    },
    images: {
        type: Array,
        default: []
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    comments: [{type: mongoose.Types.ObjectId, ref: 'comment'}]
    
}, {
    timestamps: true
});


module.exports = mongoose.model('post', postSchema);