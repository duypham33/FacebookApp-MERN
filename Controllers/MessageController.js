
const messageModel = require('../Models/MessageModel');
const conversationModel = require('../Models/ConversationModel');


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const messageCtrl = {
    createMessage: async (req, res) => {
        try{
            const {recipient, text, media, call} = req.body;
            const chat = await conversationModel.findOneAndUpdate({
                $or: [
                    {recipients: [req.userID, recipient]},
                    {recipients: [recipient, req.userID]}
                ]
            }, {
                recipients: [req.userID, recipient],
                text, media, call
            }, {new: true, upsert: true});
            
            const newMessage = await messageModel.create({
                conversation: chat._id,
                sender: req.userID,
                recipient, text, media, call
            });

            return res.status(200).send({msg: "New message is created!", conversation: chat._id});

        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    },

    getConversations: async (req, res) => {
        try {
            const features = new APIfeatures(conversationModel.find({
                recipients: req.userID
            }), req.query).paginating();
            
            const conversations = await features.query.sort('-updatedAt').
            populate('recipients', 'fullname username avatar');

            return res.status(200).send({conversations});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },

    getMessages: async (req, res) => {
        try {
            const features = new APIfeatures(messageModel.find({
                conversation: req.params.id
            }), req.query).paginating();
            
            const messages = await features.query.sort('updatedAt');

            return res.status(200).send({messages});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    },

    deleteMessage: async (req, res) => {
        try {
            console.log(req.body)
            const {sender, recipient, text, media, createdAt} = req.body;
            await messageModel.findOneAndDelete({
                sender: sender,
                recipient: recipient,
                createdAt: createdAt,
                text: text
            });

            return res.status(200).send({msg: "Delete the message!"});
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    }
}


module.exports = messageCtrl;
