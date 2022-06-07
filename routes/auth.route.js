var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLoginPage);
router.get('/logup', authController.getLogupPage);
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.post('/logup', authController.logup);

module.exports = router;
