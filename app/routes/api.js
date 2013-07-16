app = module.parent.exports.app;

var maps = require('./../controllers/maps');



app.post('/api/map/save', maps.onSave);

app.get('/api/users/export', maps.onExportXLS);
app.get('/api/users', maps.onAggregate);

app.get('*', function (req, res) { // redirect all others to the index (HTML5 history)
  req.url = '/';
});
