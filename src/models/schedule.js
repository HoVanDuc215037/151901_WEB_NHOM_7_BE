'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Schedule.init({
        currentNumber: DataTypes.INTERGER,
        maxNumber: DataTypes.INTERGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTERGER,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};