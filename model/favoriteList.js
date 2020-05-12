var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FavoriteListSchema = new Schema({
  userID: { type: Schema.Types.ObjectId , ref: 'User'}, //this is the _id, not userID in user
  favorite: [{ type: Schema.Types.ObjectId , ref: 'Location'}],
});

module.exports = mongoose.model("FavoriteList", FavoriteListSchema);
