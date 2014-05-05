/**
 * Created by qiaoliang on 14-5-3.
 */
/**
 * 博客功能的数据库模块*/

var util = require('util');
var fs = require('fs');

var blogBase = function() {
};

blogBase.prototype.getAsideInfo = function() {
    var data = fs.readFileSync('./test_data/blog_asideInfo_data.json', {encoding: 'utf8'});
    return JSON.parse(data);
};

blogBase.prototype.getBlogList = function(category) {
    var blogList = fs.readFileSync('./test_data/blog_index_data.json', {encoding: 'utf8'});
    blogList = JSON.parse(blogList);
    var filtList = new Array();
    console.info('category: ' + category);
    if(category){
    	blogList.forEach(function(val, index, array){
    		if(category == val.category){   
    			filtList.push(val);
    		}
    	});
    }else{
    	filtList = blogList;
    }
    return filtList;
};

blogBase.prototype.getBlogDetail = function(blogId) {
    var content = fs.readFileSync('./test_data/blog_detail_id' + blogId + '.txt', {encoding: 'utf8'});
    return content;
};

module.exports = new blogBase();