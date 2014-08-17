var express = require('express');
var router = express.Router();
var fs = require('fs');
var blog = require('./blog');
/* GET home page. */
router.all(/^\/blog[\/]?/, function(req, res, next){
	blog.aside(req, res, next);
});
router.all(/^\/blog[\/]?/, function(req, res, next){
	blog.header(req, res, next);
});
router.get('/blog/bloglist/:blogCategory?', function(req, res, next){
	blog.list(req, res, next, function(){
		res.render('blog/blog_index', res.data);
	});
});
router.get('/blog/detail/:blogCategory?/:_id', function(req, res, next){
	blog.detail(req, res, next, function(){
		res.render('blog/blog_index', res.data);
	});
});

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
