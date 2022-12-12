const userModel = require('../Models/UserModel');

const userCtrl = {
    search: async (req, res) => {
        try{
            const kw = req.query.kw;
            //console.log(kw);
            const users = await userModel.find({ $or: [{fullname: {$regex: kw}}, {username: {$regex: kw}},
            {email: {$regex: kw}}] }).limit(10).select("fullname username avatar");
            //console.log(users);
            return res.status(200).send({users: users});
        }
        catch(err){
            return res.status(500).send({msg: err.message});
        }
    },
}

module.exports = userCtrl;


