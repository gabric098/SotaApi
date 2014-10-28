var models  = require('../models');

exports.getSummits = function(req, res) {
    models.summit.retrieveAll(function(summits) {
        if (summits) {
            res.json(summits);
        } else {
            res.send(401, "Summit not found");
        }
    }, function(error) {
        res.send("Summit not found");
    });
};