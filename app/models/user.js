var   mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var User = new Schema({
  created: {type: Date, default: Date.now()}
  email: {type: String, default: null},
  name: {type: String, default: null},
  geoData: {
    latitude: {type: Number, default: null},
    longitude: {type: Number, default: null}
  }
  zipCode: {type: Number, default: null}
});

module.exports = mongoose.model('User', User);