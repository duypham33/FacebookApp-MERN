const commentModel = require('../Models/CommentModel');
const postModel = require('../Models/PostModel'); 

const commentCtrl = {
    createComment: async (req, res) => {
        try{
            const {content, tags, postId, reply} = req.body.newComment;
            const newComment = await commentModel.create({
                author: req.userID,
                content: content,
                tags: tags,
                postId: postId,
                reply: reply
            })

            await postModel.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })

            return res.status(200).send({
                commentID: newComment._id,
                msg: 'Your comment is created!'
            });
        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    },

    updateComment: async (req, res) => {
        try {
            await commentModel.findByIdAndUpdate(req.params.id, {
                content: req.body.content
            });

            return res.status(200).send({msg: "The post is updated!"});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },

    likeComment: async (req, res) => {
        try {
            await commentModel.findByIdAndUpdate(req.params.id, {
                $push: {likes: req.userID}
            }, {new: true});

            return res.status(200).send({msg: "Liked!"});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },
    
    unlikeComment: async (req, res) => {
        try {
            await commentModel.findByIdAndUpdate(req.params.id, {
                $pull: {likes: req.userID}
            }, {new: true});

            return res.status(200).send({msg: "Unliked!"});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    }
}

module.exports = commentCtrl;