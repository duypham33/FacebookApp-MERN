const jwt = require('jsonwebtoken');
const userModel = require('../Models/UserModel');

const isAuthenticated = (req, res, next) => {    
    try{
        const bearerHeader = req.headers['authorization'];
        //console.log(bearerHeader);
        const accessToken = bearerHeader.split(' ')[1];
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        //console.log(payload);
        req.userID = payload.id;
        next();
    }
    catch(err){
        if(err instanceof jwt.TokenExpiredError)
            return res.status(401).send('Token Expired!');
        return res.status(401).send('Invalid Token!');
    }
}


module.exports = {
    isAuthenticated: isAuthenticated
}