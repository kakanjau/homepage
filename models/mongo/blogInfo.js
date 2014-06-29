/**
 * Created by qiaoliang on 14-6-9.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var bloglist = new Schema({
    blogId : String,
    category : String,
    blogName : String,
    intro : String,
    create_time : String,
    update_time : String,
    safari_count : String
});

bloglist.methods.getBlogList = function(condition, callback){
    return this.model('bloglist').find(condition, callback);
};

module.exports = mongoose.model('bloglist', bloglist);