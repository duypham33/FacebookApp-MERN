const router = require('express').Router();
const messageCtrl = require('../Controllers/MessageController');
const authMiddleware = require('../Middleware/AuthMiddleware'); 

router.post('/:id/create', [authMiddleware.isAuthenticated], messageCtrl.createMessage);
router.get('/conversations', [authMiddleware.isAuthenticated], messageCtrl.getConversations);
router.get('/get/:id', [authMiddleware.isAuthenticated], messageCtrl.getMessages);
router.post('/delete_message', [authMiddleware.isAuthenticated], messageCtrl.deleteMessage);

module.exports = router;