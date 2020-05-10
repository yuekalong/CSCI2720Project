var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const conn = mongoose.createConnection("mongodb+srv://jackyNg:jackyng@cluster0-7hx7m.gcp.mongodb.net/test?retryWrites=true&w=majority");

var UserSchema = new Schema({
    userID: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const User = conn.model('User', UserSchema);
module.exports = User;
