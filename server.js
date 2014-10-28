/**
 * Module dependencies.
 */

var restify = require('restify');
var errorHandler = require('errorhandler');

/**
 * Controllers (route handlers).
 */

var associationController = require('./controllers/association');
var regionController = require('./controllers/region');
var summitController = require('./controllers/summit');

/**
 * Create restify server.
 */

var env = (process.env.NODE_ENV == 'development') ? 'dev' : 'production';
var server = restify.createServer({
    name: 'json-server'
});

server.use(restify.bodyParser());
server.use(restify.queryParser());

/**
 * Main routes.
 */
server.get('/api/associations', associationController.getAssociations);
server.get('/api/regions', regionController.getRegions);
server.get('/api/summits', summitController.getSummits);


/**
 * 500 Error Handler.
 */
console.log(env);
if (env === 'dev') {
    server.use(errorHandler());
}

/**
 * Start Restify server.
 */

server.listen(process.env.PORT || 3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});