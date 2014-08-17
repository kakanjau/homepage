var express = require('express');
var blogBase = require('../models/blog_model');

function aside(req, res, next) {
    res.data = res.data || {};
    res.data.aside = blogBase.getAsideInfo();
    next();
}

function header(req, res, next) {
    var category = req.params.blogCategory;
    res.data.category = category;
    blogBase.getCategorys({}, function(err, categorys){
        res.data.categorys = categorys;
        next();
    });
}

function list(req, res, next, callback) {
    var category = req.params.blogCategory;
    var condition = {category : category};
    //var pageStart = req.params.pageStart;
    //var page = pageStart;
    var count = 0;
    res.data.category = category;

    blogBase.getBlogList({condition : condition}, function(err, bloglist){
        res.data = res.data || {};
        res.data.bloglist = bloglist;
        res.data.category = category;
        res.data.blogType = 'list';

        count += bloglist.length;
        bloglist.forEach(function(blog, index){
            if(blog.showArtist){
                blogBase.getBlogDetail(blog._id, function(err, docDetail){
                    count--;
                    if(!err){
                        res.data.bloglist[index] = docDetail;
                    }
                    if(count == 0){
                        callback();//res.render('blog/blog_index', res.data);
                    }
                });
            }else{
                count --;
            }
        });
        if(count == 0){
            callback();//res.render('blog/blog_index', res.data);
        }
    });
}

function detail(req, res, next, callback) {
    var id = req.params._id;
    blogBase.getBlogDetail(id, function(err, doc){
        if(err || !doc){
            next();
        }else{
            res.data = res.data || {};
            res.data.blogType = 'detail';
            res.data.blogDetail = doc;
            callback();//res.render('blog/blog_index', res.data);
        }
    });

}
/*
function save(req, res, next) {
    var title = req.params.title;
    var content = req.params.content;
}*/

exports.aside = aside;
exports.header = header;
exports.list = list;
exports.detail = detail;
//exports.save = save;