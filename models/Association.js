module.exports = function (sequelize, DataTypes) {
    var Association =  sequelize.define('association', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
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
    return Association;
};