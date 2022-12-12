
const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authController = {
    register: async (req, res) => {
        try{
            const {fullname, username, email, password, gender} = req.body;
            //console.log(fullname, username, email, password, gender);
            let user = await userModel.findOne({username: username});
            if(user)
                return res.status(404).send({msg: "Username has already registered!"});
            user = await userModel.findOne({email: email});
            if(user)
                return res.status(404).send({msg: "Email has already registered!"});
            
            await userModel.create({
                fullname: fullname,
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 10),
                gender: gender
            });

            return res.status(200).send({msg: "Registered successfully!"});
        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    },


    login: async (req, res) => {
        try{
            const {email, password} = req.body;
            //console.log(email, password);
            //Find email
            const user = await userModel.findOne({email: email});
            //console.log(user)
            if(!user)
                return res.status(404).send({msg: "Email does not exist!"});

            const checkPassword = bcrypt.compareSync(password, user.password);
            if(!checkPassword)
                return res.status(404).send({msg: "Password does not match!"});

            const access_token = getAccessToken({id: user.id, username: user.username});
            //const refresh_token = getRefreshToken({id: user.id, username: user.username});
            
            // res.cookie('refreshtoken', refresh_token, {
            //     httpOnly: true,
            //     path: '/api/auth/refresh_token',
            //     sameSite: 'none',
            //     secure: true,
            //     maxAge: 24*60*60*1000   // 1 day
            // });

            res.json({
                access_token: access_token,
                user: {...user._doc, password: ''},
                msg: "Login successfully!"
            });
        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    },


    logout: async (req, res) => {

    },


    generateAccessToken: async (req, res) => {
        try{
            //console.log(req.cookies);
            const rfToken = req.cookies.refreshtoken;
            if(!rfToken)
                return res.status(404).send({msg: "Your session is expired! Please, log in!"});
            
            const payload = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET);
            if(!payload)
                return res.status(404).send({msg: "Please, log in!"});
            
            const user = await userModel.findById(payload.id);
            const access_token = getAccessToken(payload);
            
            res.json({
                access_token: access_token,
                user: {...user._doc, password: ''},
                msg: ""
            }); 

        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    },

    getMe: async (req, res) => {
        try{
            //console.log(req);
            const userID = req.userID;
            //console.log(userID);
            const user = await userModel.findById(userID);
            //console.log(user);
            if(!user)
                return res.status(404).send({msg: "Invalid token!"});
            return res.status(200).send({user: {...user._doc, password: ''}});

        } catch(err){
            return res.status(500).send({msg: err.message});
        }
    }
}

const getAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });
}

const getRefreshToken = payload => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    });
}

module.exports = authController;