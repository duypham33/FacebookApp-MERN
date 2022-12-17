const userModel = require('../Models/UserModel');
const postModel = require('../Models/PostModel');

const userCtrl = {
    search: async (req, res) => {
        try{
            const kw = req.query.kw;
            //console.log(kw);
            const users = await userModel.find({ $or: [{fullname: {$regex: kw}}, {username: {$regex: kw}},
            {email: {$regex: kw}}] }).limit(10).select("fullname username avatar").
            populate("followers following", "_id fullname username avatar");
            //console.log(users);
            return res.status(200).send({users: users});
        }
        catch(err){
            return res.status(500).send({msg: err.message});
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id).select("-password").
            populate("followers following", "_id fullname username avatar");
            if(!user)
                return res.status(404);
            
            const posts = await postModel.find({author: req.params.id}).sort("-updatedAt").
            populate({
                path: "comments",
                populate: {
                    path: "author likes",
                    select: "fullname username avatar"
                }
            });
            
            return res.status(200).send({
                user: user,
                posts: posts
            });

        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },

    updateProfile: async (req, res) => {
        try{
            const { fullname, mobile, address, website, story, gender, avatar } = req.body;
            const user = await userModel.findByIdAndUpdate(req.params.id, {
                fullname: fullname,
                mobile: mobile,
                address: address,
                website: website,
                story: story,
                gender: gender,
                avatar: avatar
            }, {new: true}).select("-password").
            populate("followers following", "_id fullname username avatar");

            if(!user)
                return res.status(404);
            console.log(user);
            return res.status(200).send({user: user, msg: "Your profile is updated!"});

        } catch (error) {
            return res.status(500).send({msg: err.message});
        }
    },

    follow: async (req, res) => {
        try {
            const u = await userModel.findByIdAndUpdate(req.body.targetID, {
                $push: {followers: req.params.id}
            }, {new: true});
            
            const user = await userModel.findByIdAndUpdate(req.params.id, {
                $push: {following: req.body.targetID}
            }, {new: true}).select("-password").
            populate("followers following", "_id fullname username avatar");
            
            return res.status(200).send({user: user});

        } catch (error) {
            return res.status(500).send({msg: err.message});
        }
    },

    unfollow: async (req, res) => {
        try {
            await userModel.findByIdAndUpdate(req.body.targetID, {
                $pull: {followers: req.params.id}
            }, {new: true});
            
            const user = await userModel.findByIdAndUpdate(req.params.id, {
                $pull: {following: req.body.targetID}
            }, {new: true}).select("-password").
            populate("followers following", "_id fullname username avatar");
            
            return res.status(200).send({user: user});

        } catch (error) {
            return res.status(500).send({msg: err.message});
        }
    },

    searchKnowns: async (req, res) => {
        try{
            const kw = req.query.kw;
            //console.log(kw);
            let users = null;
            if(kw === '@' || kw === ''){
                users = await userModel.find({
                    $or:[{followers: req.userID}, {following: req.userID}]
                }).limit(7).select("fullname username avatar")
            }
            else{
                users = await userModel.find({
                    $and: [
                        {
                            $or:[{followers: req.userID}, {following: req.userID}]
                        },
                        {
                            $or: [{fullname: {$regex: kw}}, {username: {$regex: kw}},
                                {email: {$regex: kw}}]
                        }
                    ]
                }).limit(7).select("fullname username avatar");
            }
                
            //console.log(users);
            return res.status(200).send({users: users});
        }
        catch(err){
            return res.status(500).send({msg: err.message});
        }
    },

    getSuggestions: async (req, res) => {
        try {
            const user = await userModel.findById(req.userID);
            const ids = [...user.following, user._id];
            const users = await userModel.aggregate([
                {$match: {_id: {$nin: ids}}},
                {$sample: {size: 10}},
                { $lookup: { from: 'user', localField: 'followers', foreignField: '_id', as: 'followers' } },
                { $lookup: { from: 'user', localField: 'following', foreignField: '_id', as: 'following' } },
            ]).project("_id fullname username avatar");
            //console.log(users);
            return res.status(200).send({users: users});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    }
}

module.exports = userCtrl;


