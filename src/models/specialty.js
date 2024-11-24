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
        static associate(models) {
            Specialty.hasMany(models.Doctor_infor, { foreignKey: 'specialtyId', as: 'belongToSpecialty' })
        }
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