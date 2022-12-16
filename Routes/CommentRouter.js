const router = require('express').Router();
const commentCtrl = require('../Controllers/CommentController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/new', [authMiddleware.isAuthenticated], commentCtrl.createComment);
router.patch('/:id/like', [authMiddleware.isAuthenticated], commentCtrl.likeComment);
router.patch('/:id/unlike', [authMiddleware.isAuthenticated], commentCtrl.unlikeComment);
router.patch('/:id/update', [authMiddleware.isAuthenticated], commentCtrl.updateComment);

module.exports = router;