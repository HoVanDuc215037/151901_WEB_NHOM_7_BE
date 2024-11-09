'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_specialty_medicalFacility extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Doctor_specialty_medicalFacility.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        medicalFacilityId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_specialty_medicalFacility',
    });
    return Doctor_specialty_medicalFacility;
};