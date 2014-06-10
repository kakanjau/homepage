var express = require('express');
var blogBase = require('../models/blog_model');

function index(req, res, next) {
    var data = blogBase.getAsideInfo();
    res.render('blog/blog_index', data);
}

function list(req, res, next) {
    var category = req.params.blogCategory;
    blogBase.getBlogList(category, function(bloglist){
        res.send(bloglist);
    });
    //res.send(blogBase.getBlogList(category));
}

function detail(req, res, next) {
    var id = req.params.blogId;
    var content = blogBase.getBlogDetail(id);
    res.send({
        id: id,
        name: '前端开发十日谈',
        content: content
    });
}

exports.index = index;
exports.list = list;
exports.detail = detail;