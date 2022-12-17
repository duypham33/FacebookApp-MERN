const router = require('express').Router();
const userCtrl = require('../Controllers/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.get('/search', [authMiddleware.isAuthenticated], userCtrl.search);
router.get('/:id', [authMiddleware.isAuthenticated], userCtrl.getUser);
router.patch('/:id/update', [authMiddleware.isAuthenticated], userCtrl.updateProfile);
router.patch('/:id/follow', [authMiddleware.isAuthenticated], userCtrl.follow);
router.patch('/:id/unfollow', [authMiddleware.isAuthenticated], userCtrl.unfollow);
router.get('/search/knowns', [authMiddleware.isAuthenticated], userCtrl.searchKnowns);
router.get('/:id/suggestions', [authMiddleware.isAuthenticated], userCtrl.getSuggestions);

module.exports = router;