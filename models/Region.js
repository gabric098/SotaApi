module.exports = function (sequelize, DataTypes) {
    var Region =  sequelize.define('region', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                Region.findAll({}, {raw: true})
                    .then(onSuccess, onError);
            },
            retrieveById: function(region_id, onSuccess, onError) {
                Region.find({where: {id: region_id}}, {raw: true})
                    .then(onSuccess, onError);
            },
            retrieveByCode: function(region_code, onSuccess, onError) {
                Region.find({where: {code: region_code}}, {raw: true})
                    .then(onSuccess, onError);
            }
        }
    });
    return Region;
};