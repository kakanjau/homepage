var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { name: 'qiao liang' });
});

module.exports = router;
