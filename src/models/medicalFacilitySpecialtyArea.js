'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MedicalFacilitySpecialtyArea extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MedicalFacilitySpecialtyArea.belongsTo(models.ComplexMedicalFacility, { foreignKey: 'medicalFacilityId', targetKey: 'id', as: 'medicalFacilitySpecialtyData' })
            MedicalFacilitySpecialtyArea.belongsTo(models.Specialty, { foreignKey: 'specialtyId', targetKey: 'id', as: 'medicalFacilityHaveSpecialty' })
        }        
    }
    MedicalFacilitySpecialtyArea.init({
        medicalFacilityId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'MedicalFacilitySpecialtyArea',
    });
    return MedicalFacilitySpecialtyArea;
};