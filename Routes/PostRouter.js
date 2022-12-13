const router = require('express').Router();
const postCtrl = require('../Controllers/PostController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/:id/create', [authMiddleware.isAuthenticated], postCtrl.createPost);
router.get('/', [authMiddleware.isAuthenticated], postCtrl.getPosts);
router.patch('/:id/update', [authMiddleware.isAuthenticated], postCtrl.updatePost);

module.exports = router;