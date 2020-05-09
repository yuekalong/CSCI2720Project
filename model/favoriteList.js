var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteListSchema = new Schema({
    userID: mongoose.ObjectId,
    favorite: [mongoose.ObjectId]
});

module.export = mongoose.model('FavoriteList', FavoriteListSchema);