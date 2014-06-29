/**
 * Created by qiaoliang on 14-5-3.
 */
/**
 * 博客功能的数据库模块*/

var util = require('util');
var fs = require('fs');
var BlogInfo = require('./mongo/blogInfo');

var blogBase = function() {
};

blogBase.prototype.getAsideInfo = function() {
    var data = fs.readFileSync('./test_data/blog_asideInfo_data.json', {encoding: 'utf8'});
    return JSON.parse(data);
};

blogBase.prototype.getBlogList = function(category, callback) {
    var blogInfo = new BlogInfo();
    blogInfo.getBlogList({}, function(err, docs){
        callback(err, docs);
    });
};

blogBase.prototype.saveBlog = function(blog, callback) {

}

blogBase.prototype.getBlogDetail = function(blogId) {
    var content = fs.readFileSync('./test_data/blog_detail_id' + blogId + '.txt', {encoding: 'utf8'});
    return content;
};

module.exports = new blogBase();