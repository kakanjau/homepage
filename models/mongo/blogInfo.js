/**
 * Created by qiaoliang on 14-6-9.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BlogListSchema = new Schema({
    blogId : String,
    category : String,
    blogName : String,
    intro : String,
    create_time : {type:Date, default: Date.now},
    update_time : {type:Date, default: Date.now},
    safari_count : Number,
    filepath : String,
    filename : String,
    fileType : {type:String, default: 'md'},
    showArtist : {type:Boolean, default: true},
    isShow : {type:Boolean, default: true},
    comments : [{
        user : String,
        reply_user : String,
        body : String,
        date : {type:Date, default: Date.now},
        comments : [{
            user : String,
            reply_user : String,
            body : String,
            date : {type:Date, default: Date.now}
        }]
    }]
});

var Bloglist  = mongoose.model('bloglist', BlogListSchema);
var blogModel = {};

blogModel.getBlogList = function(arg, callback){
    var condition = {};
    for(var c in arg.condition){
        if(arg.condition.hasOwnProperty(c) && arg.condition[c]){
            condition[c] = arg.condition[c];
        }
    }
    return Bloglist.find(condition, '_id isShow blogId intro blogName create_time safari_count showArtist category')
        .skip((arg.page.page-1)*arg.page.maxPerPage)
        .limit(arg.page.maxPerPage)
        .sort('-update_time')
        .exec(callback);
};

blogModel.getBlogListForMng = function(arg, callback){
    var condition = {};
    for(var c in arg.condition){
        if(arg.condition.hasOwnProperty(c) && arg.condition[c]){
            condition[c] = arg.condition[c];
        }
    }
    return Bloglist.find(condition, '_id isShow blogId intro blogName create_time safari_count showArtist category')
        .sort('-update_time')
        .exec(callback);
};

blogModel.getBlogCount = function(arg, callback){
    var condition = {};
    for(var c in arg.condition){
        if(arg.condition.hasOwnProperty(c) && arg.condition[c]){
            condition[c] = arg.condition[c];
        }
    }
    return Bloglist.count(condition, callback);
};

blogModel.getBlogDetail = function(_id, callback){
    return Bloglist.findById(_id)
        .exec(callback);
};

blogModel.deleteBlog = function(_id, callback){
    return Bloglist.findByIdAndRemove(_id, callback);
};

blogModel.updateBlogById = function(_id, update, callback){
    return Bloglist.findByIdAndUpdate(_id, update, callback);
};

blogModel.getCategorys = function(arg, callback){
    return Bloglist.aggregate([
        {
            $match: {
                isShow: true
            }
        },
        {
            $group: {
                _id: {
                    name: '$category'
                },
                count: {
                    $sum: 1
                }
            }
        }
    ]).exec(callback);
};

blogModel.saveBlog = function(blog, callback){

};

blogModel.Bloglist = Bloglist;

module.exports = blogModel;