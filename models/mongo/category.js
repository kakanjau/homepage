/**
 * Created by qiaoliang on 14-7-28.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var category = new Schema({
    category : Number,
    name : String
});

category.methods.getCategorys = function(arg, callback){
    return this.model('categorys').find({}, '_id category name')
        .exec(function(err, docs){
            callback(err, docs);
        });
};

module.exports = mongoose.model('categorys', category);