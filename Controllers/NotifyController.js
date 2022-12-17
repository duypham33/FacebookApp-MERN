
const postModel = require('../Models/PostModel');
const notifyModel = require('../Models/NotifyModel');


const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(500).send({msg: err.message});
        }
    }
}


module.exports = notifyCtrl;