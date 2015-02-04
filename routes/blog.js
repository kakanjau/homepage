var express = require('express');
var async = require('async');

var config = require('../appconfig');
var blogBase = require('../models/blog_model');
var categoryModel = require('../models/category_model').category;

function aside(req, res, next) {
    res.data = res.data || {};
    res.data.aside = blogBase.getAsideInfo();

    var category = req.params.blogCategory;
    res.data.category = category;
    var categorys = categoryModel.get();
    if(categorys.length == 0){
        categoryModel.reload({}, function(err, categorys){
            res.data.categorys = categorys;
            next();
        })
    }else{
        res.data.categorys = categorys;
        next();
    }
}

function list(req, res, next, callback) {
    var category = req.params.blogCategory;
    var condition = {category : category};
    res.data.category = category;
    var param = {
        condition: condition,
        page: {
            page: req.params.page,
            maxPerPage: req.params.page ? config.pageInfo.maxPerPage : null
        }
    };

    async.series(
        [
            blogBase.getBlogCount(param, function(err, blogCount){
                res.data.page = res.data.page || {};
                res.data.page.maxPage = Math.ceil(blogCount/config.pageInfo.maxPerPage);
            }),
            blogBase.getBlogList(param, function(err, bloglist){
                res.data = res.data || {};
                res.data.bloglist = bloglist;
                res.data.category = category;
                res.data.blogType = 'list';
                res.data.page = res.data.page || {};
                res.data.page.curPage = req.params.page;

                async.map(bloglist, function(blog, acb){
                    if(blog.showArtist){
                        blogBase.getBlogDetailForShow(blog._id, function(err, docDetail){
                            bloglist[bloglist.indexOf(blog)] = docDetail;
                            acb(null, docDetail);
                        });
                    }
                    else{
                        acb(null);
                    }
                }, function(err, results){
                    callback();
                });
            })
        ]
    );
}

function detail(req, res, next, callback) {
    var id = req.params._id;
    blogBase.getBlogDetailForShow(id, function(err, doc){
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
exports.list = list;
exports.detail = detail;
//exports.save = save;