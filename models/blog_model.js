/**
 * Created by qiaoliang on 14-5-3.
 */
/**
 * 博客功能的数据库模块*/

var util = require('util');
var fs = require('fs');
var md = require('markdown').markdown;
var BlogInfo = require('./mongo/blogInfo');
var config = require('../appconfig');
var Category = require('./mongo/category');

var blogBase = function() {
};

var getBlogDetail = function(_id, callback) {
    var blogInfo = new BlogInfo();
    blogInfo.getBlogDetail(_id, function(err, doc){
        if(err || !doc.filepath || !doc.filename){
            callback(err, null);
        }else{
            var fsPath = config.DATA_FILE_PATH + '/' + doc.filepath + '/' + doc.filename;
            doc.content = fs.readFileSync(fsPath,  'utf8');
            switch(doc.fileType){
                case 'md' : doc.content = md.toHTML(doc.content);
                    break;
                case 'html' :
                default :
                    break;
            }
            callback(err, doc);
        }
    });
};

blogBase.prototype.getAsideInfo = function() {
    var data = fs.readFileSync('./test_data/blog_asideInfo_data.json',  'utf8');
    return JSON.parse(data);
};

blogBase.prototype.saveBlog = function(blog, callback) {    
    //todo 创建文件
    var dirPath = config.DATA_FILE_PATH + '/' + blog.filepath;
    var fsPath =  dirPath + '/' + blog.filename;
    fs.exists(dirPath, function(exists){
        if(!exists){
            fs.mkdirSync(dirPath);
        }
        fs.writeFile(fsPath, function(err){
            if(err) throw err;
        });
    })
    var blogInfo = new BlogInfo(blog);
    blogInfo.save(callback);
}

blogBase.prototype.getBlogDetail = function(_id, callback){
    getBlogDetail(_id, callback);
}

blogBase.prototype.getBlogList = function(arg, callback) {
    var blogInfo = new BlogInfo();
    blogInfo.getBlogList(arg, function(err, docs){
        callback(err, docs);
    });
};

blogBase.prototype.getCategorys = function(arg, callback){
    var category = new Category();
    category.getCategorys(arg, function(err, docs){
        callback(err, docs);
    });
};

module.exports = new blogBase();