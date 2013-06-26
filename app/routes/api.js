app = module.parent.exports.app;

exports.index = function(req, res) {
  res.render('map');
};

app.get('/map', exports.index);
app.get('/', exports.index);