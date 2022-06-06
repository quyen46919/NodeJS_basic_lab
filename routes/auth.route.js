var express = require('express');
var router = express.Router();

/* LOGIN */
router.post('/login', function(req, res, next) {
  res.send('This is login route');
});

/* REGISTER */
router.post('/register', function(req, res, next) {
  res.send('This is register route');
});

module.exports = router;
