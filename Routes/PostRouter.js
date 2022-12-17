const router = require('express').Router();
const postCtrl = require('../Controllers/PostController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/:id/create', [authMiddleware.isAuthenticated], postCtrl.createPost);
router.get('/', [authMiddleware.isAuthenticated], postCtrl.getPosts);
router.get('/:id', [authMiddleware.isAuthenticated], postCtrl.getPostDetail);
router.patch('/:id/update', [authMiddleware.isAuthenticated], postCtrl.updatePost);
router.patch('/:id/like', [authMiddleware.isAuthenticated], postCtrl.likePost);
router.patch('/:id/unlike', [authMiddleware.isAuthenticated], postCtrl.unlikePost);

module.exports = router;