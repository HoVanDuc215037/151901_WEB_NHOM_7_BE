'use strict';
const {
    Model,
    INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_clinic_specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Doctor_clinic_specialty.init({
        docterId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_clinic_specialty',
    });
    return Doctor_clinic_specialty;
};