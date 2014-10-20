// BASE SETUP
// =============================================================================

var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

// IMPORT MODELS
// =============================================================================
var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

var crypto = require('crypto');
var DataTypes = require("sequelize");

var Association = sequelize.define('association', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
}, {
    freezeTableName: true,
    tableName: 'association',
    instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            Association.findAll({}, {raw: true})
                .then(onSuccess, onError);
        },
        retrieveById: function(association_id, onSuccess, onError) {
            Association.find({where: {id: association_id}}, {raw: true})
                .then(onSuccess, onError);
        },
        retrieveByCode: function(association_code, onSuccess, onError) {
            Association.find({where: {code: association_code}}, {raw: true})
                .then(onSuccess, onError);
        }
    }
});

// IMPORT ROUTES
// =============================================================================
var router = express.Router();

// on routes that end in /associations
// ----------------------------------------------------
router.route('/associations')

// get all the associations (accessed at GET http://localhost:8080/api/associations)
    .get(function(req, res) {
        var association = Association.build();

        association.retrieveAll(function(associations) {
            if (associations) {
                res.json(associations);
            } else {
                res.send(401, "Association not found");
            }
        }, function(error) {
            res.send("Association not found");
        });
    });

router.route('/association/:code')

// get all the associations by CODE (accessed at GET http://localhost:8080/api/associations/:code)
    .get(function(req, res) {
        var association = Association.build();

        association.retrieveByCode(req.params.code, function(associations) {
            if (associations) {
                res.json(associations);
            } else {
                res.send(401, "Association not found");
            }
        }, function(error) {
            res.send("Association not found");
        });
    });

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);