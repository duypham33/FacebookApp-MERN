const router = require('express').Router();
const notifyCtrl = require('../Controllers/NotifyController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/create', [authMiddleware.isAuthenticated], notifyCtrl.createNotify);


module.exports = router;