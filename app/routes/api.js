app = module.parent.exports.app;

var maps = require('./../controllers/maps');

app.get('*', function (req, res) { // redirect all others to the index (HTML5 history)
  req.url = '/';
});

app.post('/api/map/save', maps.onSave);
