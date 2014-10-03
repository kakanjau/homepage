/**
 * Created by qiaoliang on 14-6-9.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var bloglist = new Schema({
    blogId : String,
    category : Number,
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

bloglist.methods.getBlogList = function(arg, callback){
    var condition = {};
    for(var c in arg.condition){
        if(arg.condition.hasOwnProperty(c) && arg.condition[c]){
            condition[c] = arg.condition[c];
        }
    }
    return this.model('bloglist').find(condition, '_id isShow blogId intro blogName create_time safari_count showArtist category')
        .skip((arg.page.page-1)*arg.page.maxPerPage + 1)
        .limit(arg.page.maxPerPage)
        .sort('-update_time')
        .exec(callback);
};

bloglist.methods.getBlogCount = function(arg, callback){
    var condition = {};
    for(var c in arg.condition){
        if(arg.condition.hasOwnProperty(c) && arg.condition[c]){
            condition[c] = arg.condition[c];
        }
    }
    return this.model('bloglist').count(condition, callback);
};

bloglist.methods.getBlogDetail = function(_id, callback){
    return this.model('bloglist').findById(_id)
        .exec(callback);
};

bloglist.methods.deleteBlog = function(_id, callback){
    return this.model('bloglist').findByIdAndRemove(_id, callback);
};

bloglist.methods.updateBlogById = function(_id, update, callback){
    return this.model('bloglist').findByIdAndUpdate(_id, update, callback);
};

bloglist.methods.saveBlog = function(blog, callback){

};

module.exports = mongoose.model('bloglist', bloglist);