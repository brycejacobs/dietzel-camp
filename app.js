// Nodemon watch: nodemon --watch app/routes --watch app.js --watch app/controllers --watch app/config.js --watch app/jobs app.js

var express = require('express')
  , config = require('./app/config')
  , app = module.exports = express();

// Check node_env, if not set default to development
process.env.NODE_ENV = (process.env.NODE_ENV || "development");

/*
 * This section is for environment specific configuration
 */
app.configure('development', function(){
  config.setDevelopmentConfig();
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  config.setProductionConfig();
  config.EnvConfig.port = process.env.PORT;
  app.use(express.errorHandler());
});

app.configure(function(){
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/app/public'));
  app.use(express.directory(__dirname + '/app/public'));
  app.use(app.router);
});

config.establishDatabaseConnection();

app.listen(config.EnvConfig.port, function(){
  console.log("Express server listening on port %d in %s mode", config.EnvConfig.port, app.settings.env);
});

console.log('Server Time: %s', new Date());

/*
 * Exports the express app for other modules to use
 * all route matches go the routes.js file
 */
module.exports.app = app;
module.exports.config = config;

routes = require('./app/routes/api');