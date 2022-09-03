var express = require('express');
const multer = require('multer');
var router = express.Router();
const newsController = require('../controllers/news.controller');

router.get('/', newsController.getHomePage);
router.get('/post', newsController.getPostPage);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
      cb(null, 'public/images');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg');
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), newsController.createNews);
module.exports = router;
