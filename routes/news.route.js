var express = require('express');
const multer = require('multer');
var router = express.Router();
const newsController = require('../controllers/news.controller');

router.get('/', newsController.getHomePage);
router.get('/post', newsController.getPostPage);
router.get('/edit', newsController.getEditPage);
router.get('/delete', newsController.getDeletePage);

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
router.post('/edit', upload.single('image'), newsController.updateNews);
router.post('/delete', newsController.deleteNews);
module.exports = router;
