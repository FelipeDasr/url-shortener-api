const { Model, DataTypes } = require('sequelize');
const DBConnection = require('../database');

class ShortURL extends Model { };

ShortURL.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        originalUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        hits: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        }
    },
    {
        sequelize: DBConnection,
        modelName: 'Shorturls'
    }
);

module.exports = {
    ShortURL
};