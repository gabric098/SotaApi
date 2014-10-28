module.exports = function (sequelize, DataTypes) {
    var Summit =  sequelize.define('summit', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                Summit.findAll({}, {raw: true})
                    .then(onSuccess, onError);
            },
            retrieveById: function(summit_id, onSuccess, onError) {
                Summit.find({where: {id: summit_id}}, {raw: true})
                    .then(onSuccess, onError);
            },
            retrieveByCode: function(summit_code, onSuccess, onError) {
                Summit.find({where: {code: summit_code}}, {raw: true})
                    .then(onSuccess, onError);
            }
        }
    });
    return Summit;
};