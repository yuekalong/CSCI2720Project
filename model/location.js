var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var LocationSchema = new Schema({
    locationID:  String,
    latitude: SchemaTypes.Double,
    longitude:   SchemaTypes.Double,
    locationName:  { type: String, required:true },
    photo: String,
    address: [{ name: String }],
    phoneNum: Number,
    rating: Number
});

module.export = mongoose.model('Location', LocationSchema);