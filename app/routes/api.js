app = module.parent.exports.app;

exports.index = function(req, res) {
  res.render('map');
};

app.get('*', function (req, res) { // redirect all others to the index (HTML5 history)
  req.url = '/';
});

app.get('/map', exports.index);
app.get('/', exports.index);