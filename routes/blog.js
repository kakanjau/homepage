var express = require('express');
var blogBase = require('../models/blog_model');

function aside(req, res, next) {
    res.data = res.data || {};
    res.data.aside = blogBase.getAsideInfo();;
    return next();
}

function list(req, res, next) {
    var category = req.params.blogCategory;
    blogBase.getBlogList(category, function(err, bloglist){
        res.data = res.data || {};
        res.data.bloglist = bloglist;
        res.data.blogType = 'list';
        res.render('blog/blog_index', res.data);
    });
}

function detail(req, res, next) {
    var id = req.params.blogId;
    var content = blogBase.getBlogDetail(id);
    res.data = res.data || {};
    res.data.blogType = 'detail';
    res.data.blogDetail = {
        id: id,
        name: '前端开发十日谈',
        content: content
    };
    res.render('blog/blog_index', res.data);
}
/*
function save(req, res, next) {
    var title = req.params.title;
    var content = req.params.content;
}*/

exports.aside = aside;
exports.list = list;
exports.detail = detail;
//exports.save = save;