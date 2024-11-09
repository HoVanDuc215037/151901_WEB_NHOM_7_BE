'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Specialty.init({
        name: DataTypes.STRING,
        htmlDescription: DataTypes.TEXT,
        markdownDescription: DataTypes.TEXT,
        specialtyImage: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};