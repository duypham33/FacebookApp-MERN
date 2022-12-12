const router = require('express').Router();
const userCtrl = require('../Controllers/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.get('/search', [authMiddleware.isAuthenticated], userCtrl.search);

module.exports = router;