var mongoose = require('mongoose');

/*
 * modify values in these methods to set
 * environment specific info
 */
function setDevelopmentConfig(){
    // These are just examples, insert you info here
    DatabaseConfig.port = 27738;
    DatabaseConfig.host = 'ds027738.mongolab.com';
    DatabaseConfig.name = 'dietzel-congressional';
    DatabaseConfig.user = 'sosick_admin';
    DatabaseConfig.pass = 'Fake123!';

    EnvConfig.port = 3000;
}

function createDatabaseConnection() {
    var config = this.DatabaseConfig;
    var connString = 'mongodb://' + config.user + ':' + config.pass + '@' + config.host + ':' + config.port + '/' + config.name;
    console.log('Connecting to ', connString);
    mongoose.connect(connString);
}


function setProductionConfig(){
    DatabaseConfig.port = 27738;
    DatabaseConfig.host = 'ds027738.mongolab.com';
    DatabaseConfig.name = 'dietzel-congressional';
    DatabaseConfig.user = 'sosick_admin';
    DatabaseConfig.pass = 'Fake123!';

    EnvConfig.port = 80;
}

/* --- no need to modify below this line -- */
var DatabaseConfig = {
    port        : Number,
    host        : String,
    name        : String,
    user        : String,
    pass        : String
};

var EnvConfig = {
    port        : Number
};

module.exports.DatabaseConfig = DatabaseConfig;
module.exports.establishDatabaseConnection = createDatabaseConnection;
module.exports.EnvConfig = EnvConfig;
module.exports.setDevelopmentConfig = setDevelopmentConfig;
module.exports.setProductionConfig = setProductionConfig;