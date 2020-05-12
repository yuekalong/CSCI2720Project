var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FavoriteListSchema = new Schema({
  userID: {type: Number, required: true, unique: true},
  favorite: [mongoose.ObjectId],
});

module.exports = mongoose.model("FavoriteList", FavoriteListSchema);
