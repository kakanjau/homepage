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
    update_time : Date,
    safari_count : Number,
    filepath : String,
    filename : String,
    fileType : String,
    showArtist : Boolean,
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
    return this.model('bloglist').find(condition, '_id blogId intro blogName create_time safari_count showArtist category')
        .limit(arg.page || 10)
        .sort('-update_time')
        .exec(callback);
};

bloglist.methods.getBlogDetail = function(_id, callback){
    return this.model('bloglist').findById(_id)
        //.select('blogId category blogName create_time update_time safari_count filepath filename fileType comments')//
        .exec(function(err, doc){
            callback(err, doc);
        });
};

module.exports = mongoose.model('bloglist', bloglist);