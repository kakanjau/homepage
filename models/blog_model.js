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
var blogInfo = new BlogInfo();
var category = new Category();

var blogBase = function() {};

var getBlogDetail = function(_id, isTranslateMd, callback) {    
    blogInfo.getBlogDetail(_id, function(err, doc){
        if(err || !doc || !doc.filepath || !doc.filename){
            callback(err, null);
        }else{
            var fsPath = config.DATA_FILE_PATH + '/' + doc.filepath + '/' + doc.filename;
            if(fs.existsSync(fsPath)){                
                doc.content = fs.readFileSync(fsPath,  'utf8');
                if(isTranslateMd){                
                    switch(doc.fileType){
                        case 'md' : doc.content = md.toHTML(doc.content);
                            break;
                        case 'html' :
                        default :
                            break;
                    }
                }
            }
            callback(err, doc);
        }
    });
};

var writeFile = function(dirPath, fsPath, text, callback){
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    fs.writeFile(fsPath, text, callback);
};

blogBase.prototype.getAsideInfo = function() {
    var data = fs.readFileSync('./test_data/blog_asideInfo_data.json',  'utf8');
    return JSON.parse(data);
};

blogBase.prototype.getBlogDetailForShow = function(_id, callback){
    getBlogDetail(_id, true, callback);
};

blogBase.prototype.getBlogDetailForUpdate = function(_id, callback){
    getBlogDetail(_id, false, callback);
};

blogBase.prototype.getBlogList = function(arg, callback) {
    blogInfo.getBlogList(arg, function(err, docs){
        callback(err, docs);
    });
};

blogBase.prototype.getBlogCount = function(arg, callback) {
    blogInfo.getBlogCount(arg, function(err, count){
        callback(err, count);
    });
};

blogBase.prototype.getCategorys = function(arg, callback){
    category.getCategorys(arg, function(err, docs){
        callback(err, docs);
    });
};

blogBase.prototype.saveBlog = function(blog, callback) {
    blog.filepath = blog.blogName;
    blog.filename = blog.blogName + '.md';
    var blogInfo = new BlogInfo(blog);
    blogInfo.save( function(err, blogInfo){
        if(!err){
            var dirPath = config.DATA_FILE_PATH + '/' + blog.filepath;
            var fsPath =  dirPath + '/' + blog.filename;
            writeFile(dirPath, fsPath, blog.text,  function(err){
                if(err){
                    blogInfo.remove();
                }
                if(typeof callback === 'function'){
                    callback(err);
                }
            });
        }else{
            if(typeof callback === 'function'){
                callback(err);
            }
        }
    });
};

blogBase.prototype.updateBlog = function(_id, update, callback){
    blogInfo.updateBlogById(_id, update, function(err, blog){
        if(!err && update.text){
            var dirPath = config.DATA_FILE_PATH + '/' + blog.filepath;
            var fsPath = dirPath + '/' + blog.filename;
            writeFile(dirPath, fsPath, update.text,  callback);
        }else{
            if(typeof callback === 'function'){
                callback(err);
            }
        }
    });
};

blogBase.prototype.removeBlog = function(_id, callback){
    var rmdir = function(dirPath){
        var fiels = [];
        if(fs.existsSync(dirPath)){
            files = fs.readdirSync(dirPath);
            files.forEach(function(file,index){
                var curPath = dirPath + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    rmdir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
        }
        fs.rmdirSync(dirPath);
    };

    blogInfo.deleteBlog(_id, callback);
};

module.exports = new blogBase();