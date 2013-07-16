var   User = require('./../models/user')
    , check = require('validator').check;

exports.onSave = function onSaveUserData (req, res) {
  var   email
      , geo
      , name
      , sentData = req.body;

  try {
    email = sentData.email;
    check(email).isEmail().notNull();
  } catch (e) {
    //no email
    email = null;
  }

  try {
    name = sentData.name;
    check(name).notNull();
  } catch (e) {
    name = null;
  }

  try {
    geo = sentData.geoLocation;
    check(geo).notNull();
  } catch (e) {
    geo = null;
  }

  new User({
    fromInput: {
      address: sentData.address,
      email: email,
      googleLocation: {
        latitude: sentData.userLocation.lat,
        longitude: sentData.userLocation.long
      },
      name: name
    },
    geoData: {
      latitude: geo.lat,
      longitude: geo.long
    }

  }).save(function onSaveComplete (error) {
    if(error) {
      console.log('Error:\n%s', error);
      return res.send(500, error);
    } else {
      return res.send(200);
    }
  });
};