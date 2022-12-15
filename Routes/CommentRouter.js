const router = require('express').Router();
const commentCtrl = require('../Controllers/CommentController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/new', [authMiddleware.isAuthenticated], commentCtrl.createComment);


module.exports = router;