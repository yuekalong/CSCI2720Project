var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FavoriteListSchema = new Schema({
  userID: {type: Number, required: true, unique: true},
  favorite: {type:[mongoose.ObjectId], required: false},
});

module.exports = mongoose.model("FavoriteList", FavoriteListSchema);
