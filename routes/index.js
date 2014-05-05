var express = require('express');
var router = express.Router();
var fs = require('fs');
var blog = require('./blog');
/* GET home page. */
router.get('/blog', blog.index);

router.get('/blog_list/', blog.list);

router.get('/blog_list/:blogCategory', blog.list);

router.get('/blog_detail/:blogId', blog.detail);

router.get('/todo', function(req, res) {
  var data = {
  	name: 'qiao liang',
  	todo_active : 'active'
  };
   res.render('todo/todo_index', data);
});

router.get('/', function(req, res) {
   res.redirect('blog');
});
module.exports = router;
