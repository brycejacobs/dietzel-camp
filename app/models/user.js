var   mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var User = new Schema({
  created: {type: Date, default: Date.now()},
  fromInput: {
    address: {type: String, default: null},
    email: {type: String, default: null},
    googleLocation: {
      latitude: {type: Number, default: null},
      longitude: {type: Number, default: null}
    },
    name: {type: String, default: null}
  },
  geoData: {
    latitude: {type: Number, default: null},
    longitude: {type: Number, default: null}
  }
});

module.exports = mongoose.model('User', User);