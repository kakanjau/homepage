var express = require('express');
var pass = require('../models/pass');
var blog = require('./blog');
var blogBase = require('../models/blog_model');

var router = express.Router();



/* all user listing. */

router.all('/user', function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
});

router.all(/^\/user[\/]?/, function(req, res, next){
	blog.aside(req, res, next);
});

router.all(/^\/user[\/]?/, function(req, res, next){
	blog.header(req, res, next);
});

router.post('/user/addArtist', function(req, res, next){
	var blog = {};
	blog.category = req.body.category;
	blog.blogName = blog.filepath = req.body.title;
	blog.intro = req.body.intro;
	blog.filename = req.body.title + '.md';
	//保存
	blogBase.saveBlog(blog, function(){
		res.redirect('/user/bloglist');
	});
});

router.get('/user/bloglist/:blogCategory?', function(req, res, next){
	blog.list(req, res, next, function(){
		res.render('user/user_blog_index', res.data);
	});
});

router.get('/user/detail/:blogCategory?/:_id', function(req, res, next){
	blog.detail(req, res, next, function(){
		res.render('user/blog_index', res.data);
	});
});

router.get('/user', function(req, res) {
    res.redirect('user/bloglist');
});

router.post('/login', pass.authenticate('local', {
    successRedirect: '/user/bloglist',
    failureRedirect: '/blog'
}));

module.exports = router;
