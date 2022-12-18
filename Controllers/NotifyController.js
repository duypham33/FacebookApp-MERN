
const postModel = require('../Models/PostModel');
const notifyModel = require('../Models/NotifyModel');


const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            const {postId, text, recipients, url, content, image} = req.body.notify;
            const notify = await notifyModel.create({postId, text,
                recipients, url, image, content, user: req.userID});

            return res.status(200).send({notify: notify});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },

    getNotify: async (req, res) => {
        try {
            const notifies = await notifyModel.find({recipients: req.userID}).sort("isRead -createdAt").
            populate("user", "username fullname avatar");

            return res.status(200).send({notifies: notifies});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    }
}


module.exports = notifyCtrl;