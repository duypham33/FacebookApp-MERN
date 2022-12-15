const commentModel = require('../Models/CommentModel');
const postModel = require('../Models/PostModel'); 

const commentCtrl = {
    createComment: async (req, res) => {
        try{
            const {content, tags, postId} = req.body.newComment;
            const newComment = await commentModel.create({
                author: req.userID,
                content: content,
                tags: tags,
                postId: postId
            })

            await postModel.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })

            return res.status(200).send({
                msg: 'Your comment is created!'
            });
        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    }
}

module.exports = commentCtrl;