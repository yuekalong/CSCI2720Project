var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    commentID: String,
    content: String,
    replyCommentsList: [mongoose.ObjectId],
    date: {type: Date, default: Date.now}
});

module.export = mongoose.model('location', CommentSchema);