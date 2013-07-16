var   User = require('./../models/user')
    , check = require('validator').check
    , Q = require('q')
    , _ = require('lodash')
    , nodeExcel = require('excel-export');

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

exports.onAggregate = function (req, res) {
  User.find({})
    .exec()
    .then(function onFindUsersComplete (users) {
      return res.send(200, users);
    }, function onFindUsersFail (error) {
      return res.send(500, error);
    });
};

exports.onExportXLS = function (req, res) {
  User.find({})
    .exec()
    .then(function onFindUsersComplete (users) {
      console.log(users);
      return callback(users);
    }, function onFindUsersFail (error) {
      return res.send(500, error);
    });

  function callback(result) {
    var conf = {};
    conf.cols = [
      {caption: 'Address', type: 'string'},
      {caption: 'Name', type: 'string'},
      {caption: 'Email', type: 'string'},
      {caption: 'Hit-Date', type: 'date'},
      {caption: 'Geo-Lat', type: 'string'},
      {caption: 'Geo-Lng', type: 'string'},
      {caption: 'Addr-Lat', type: 'string'},
      {caption: 'Addr-Lng', type: 'string'},
    ];

    var rows = [];

    _.forEach(result, function onIterateUsers (user, index) {
      var row = [];
      row.push(user.fromInput.address);
      row.push(user.fromInput.name || 'N/A');
      row.push(user.fromInput.email || 'N/A');
      row.push(new Date(user.created).getJulian());
      row.push(user.geoData.latitude || 'N/A');
      row.push(user.geoData.longitude || 'N/A');
      row.push(user.fromInput.googleLocation.latitude || 'N/A');
      row.push(user.fromInput.googleLocation.longitude || 'N/A');
      rows.push(row);
    });

    conf.rows = rows;

    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Dietzel For Congress Signups.xlsx");
    res.end(result, 'binary');
  }
};






