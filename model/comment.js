var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var CommentSchema = new Schema({
//   commentID: String,
//   content: String,
//   replyCommentsList: [mongoose.ObjectId],
//   date: { type: Date, default: Date.now },
// });

var CommentSchema = new Schema({
  commentID: String,
  locationID: String,
  parent_id: String,
  posted: {type: Date, default: Date.now},
  userID: Number,
  text: String
});

module.exports = mongoose.model("Comment", CommentSchema);
