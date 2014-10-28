var models  = require('../models');

exports.getAssociations = function(req, res) {
    models.association.retrieveAll(function(associations) {
        if (associations) {
            res.json(associations);
        } else {
            res.send(401, "Association not found");
        }
    }, function(error) {
        res.send("Association not found");
    });
};
