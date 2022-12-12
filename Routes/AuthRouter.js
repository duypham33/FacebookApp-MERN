const router = require('express').Router();
const authCtrl = require('../Controllers/AuthController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);

router.post('/logout', authCtrl.logout);

router.post('/refresh_token', authCtrl.generateAccessToken);

router.get('/getme', [authMiddleware.isAuthenticated], authCtrl.getMe);

module.exports = router;