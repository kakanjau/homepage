var express = require('express');
var router = express.Router();
var fs = require('fs');
var blog = require('./blog');
/* GET home page. */
router.get(/^\/blog[\/]?/, blog.aside);
router.get(/^\/blog[\/]?/, blog.header);
router.get('/blog/bloglist/:blogCategory?', blog.list);
router.get('/blog/detail/:blogCategory?/:_id', blog.detail);

router.get('/todo', function(req, res) {
  var data = {
  	name: 'qiao liang',
  	todo_active : 'active'
  };
    res.redirect('blog');
});

router.get('/', function(req, res) {
   res.redirect('blog/bloglist');
});
router.get('/blog', function(req, res) {
    res.redirect('blog/bloglist');
});
module.exports = router;
