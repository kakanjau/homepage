/**
 * Created by qiaoliang on 14-5-3.
 */
/**
 * 博客功能的分类模块*/

var blogInfo = require('./mongo/blogInfo');
var array = [];

var category = {};
category.clear = function(){
    array.length = 0;
};

category.get = function(){
    return array;
};

category.reload = function(){
    if(arguments.length > 0){
        var callback = arguments[arguments.length-1];
    }
    
    blogInfo.getCategorys(null, function(err, docs){
        category.clear();
        docs.forEach(function(item){
            array.push({
                name: item._id.name,
                count: item.count
            });
        });

        callback(err, array);
    });
};

exports.category = category;