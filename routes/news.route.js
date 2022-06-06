var express = require('express');
var router = express.Router();

/* GET NEWS LIST */
router.get('/', function(req, res) {
    res.send('Get news list');
});

/* CREATE NEW NEWS */
router.post('/', function(req, res) {
  res.send('Create new news');
});

/* UPDATE NEWS BY ID */
router.patch('/:newsId', function(req, res) {
  res.send('Update news');
});

/* GET NEWS BY ID */
router.get('/:newId', function(req, res) {
    res.send('Get news by Id');
});

module.exports = router;