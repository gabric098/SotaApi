var models  = require('../models');

exports.getRegions = function(req, res) {
    models.region.retrieveAll(function(regions) {
        if (regions) {
            res.json(regions);
        } else {
            res.send(401, "Region not found");
        }
    }, function(error) {
        res.send("Region not found");
    });
};