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

router.get(/^\/user[\/]?/, function(req, res, next){
	blog.aside(req, res, next);
});

router.post('/user/saveArtist', function(req, res, next){
	var blog = {};
	blog.category = req.body.category;
	blog.blogName = req.body.title;
	blog.intro = req.body.intro;
	blog.text = req.body.text;
	//保存
	if(req.body._id){
		blogBase.updateBlog(req.body._id, blog, function(){
			res.redirect('/user/bloglist');
		});
	}else{
		blogBase.saveBlog(blog, function(){
			res.redirect('/user/bloglist');
		});
	}
});

router.get('/user/bloglist/:blogCategory?', function(req, res, next){
	blog.list(req, res, next, function(){
		res.render('user/user_blog_index', res.data);
	});
});

router.get('/user/findblog', function(req, res, next){
	blogBase.getBlogDetailForUpdate(req.query._id, function(err, blog){
		if(err){
			res.json({
				status: 'err',
				errInfo: err
			});
		}else{	
			var blogDetail = {
				_id: blog._id,
				blogName: blog.blogName,
				intro: blog.intro,
				text: blog.content,
				category: blog.category
			};
			res.json({blog: blogDetail});
		}
	});
});

router.post('/user/delete', function(req, res, next){
	blogBase.removeBlog(req.body._id, function(err){
		if(err){
			res.json({
				status: 'err',
				errInfo: err
			});
		}else{	
			res.json({status: 'success'});
		}
	});
});

router.post('/user/update/blog_hidden', function(req, res, next){
	blogBase.updateBlog(req.body._id, {isShow: false}, function(err, blog){
		if(err){
			res.json({
				status: 'err',
				errInfo: err
			});
		}else{	
			res.json({blog: blog});
		}
	});
});

router.post('/user/update/blog_show', function(req, res, next){
	blogBase.updateBlog(req.body._id, {isShow: true}, function(err, blog){
		if(err){
			res.json({
				status: 'err',
				errInfo: err
			});
		}else{	
			res.json({blog: blog});
		}
	});
});

router.post('/user/update/artist_hidden', function(req, res, next){
	blogBase.updateBlog(req.body._id, {showArtist: false}, function(err, blog){
		if(err){
			res.json({
				status: 'err',
				errInfo: err
			});
		}else{	
			res.json({blog: blog});
		}
	});
});

router.post('/user/update/artist_show', function(req, res, next){
	blogBase.updateBlog(req.body._id, {showArtist: true}, function(err, blog){
		if(err){
			res.json({
				status: 'err',
				errInfo: err
			});
		}else{	
			res.json({blog: blog});
		}
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
