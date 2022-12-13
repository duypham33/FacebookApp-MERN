
const postModel = require('../Models/PostModel');
const userModel = require('../Models/UserModel');


const postCtrl = {
    createPost: async (req, res) => {
        try {
            const newPost = await postModel.create({
                author: req.userID,
                content: req.body.content,
                images: req.body.images
            });
            
            return res.status(200).send({
                newPost: newPost,
                msg: 'Your new post is created!'
            })

        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },

    getPosts: async (req, res) => {
        try {
            const myposts = await postModel.find({author: req.userID}).sort("-createdAt").
            populate("author", "fullname username avatar");
            
            const user = await userModel.findById(req.userID);
            const homePosts = await postModel.find({author: {$in: [...user.following, user._id]}}).
            sort("-updatedAt").populate("author", "fullname username avatar");
            
            return res.status(200).send({
                myposts: myposts,
                homePosts: homePosts,
                result: homePosts.length
            });

        } catch (error) {
            return res.status(500).send({msg: error.message});
        }
    },

    updatePost: async (req, res) => {
        try {
            const post = await postModel.findByIdAndUpdate(req.params.id, {
                content: req.body.content,
                images: req.body.images
            }, {new: true}).populate("author", "fullname username avatar");
            
            return res.status(200).send({
                updatedPost: post,
                msg: 'Your post is updated!'
            });

        } catch (error) {
            return res.status(500).send({msg: error.message});
        }
    }
}


module.exports = postCtrl;