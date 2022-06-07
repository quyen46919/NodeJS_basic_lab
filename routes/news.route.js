var express = require('express');
var router = express.Router();
const newsController = require('../controllers/news.controller');

router.get('/', newsController.getHomePage);
module.exports = router;