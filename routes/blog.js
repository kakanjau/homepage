var express = require('express');
var async = require('async');
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
    res.data.category = category;
    var param = {
        condition: condition,
        page: {
            page: req.params.page,
            maxPerPage: req.params.page ? 3 : null
        }
    };

    async.series(
        [
            blogBase.getBlogCount(param, function(err, blogCount){
                res.data.page = res.data.page || {};
                res.data.page.maxPage = Math.ceil(blogCount/3);
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

                // bloglist.forEach(function(blog, index){
                //     if(blog.showArtist){
                //         funclist.push(function(callback){
                //             blogBase.getBlogDetailForShow(blog._id, function(err, docDetail){
                //                 if(!err){
                //                     // res.data.bloglist[index] = docDetail;
                //                     blog = docDetail;
                //                 }
                //                 callback(null);
                //             });
                //         });
                //     }
                // });
                // async.parallel(funclist, function(err){
                //     if(!err){
                //         callback();
                //     }
                // });
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
exports.header = header;
exports.list = list;
exports.detail = detail;
//exports.save = save;