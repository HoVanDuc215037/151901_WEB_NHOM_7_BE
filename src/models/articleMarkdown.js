'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ArticleMarkdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models){
            ArticleMarkdown.belongsTo(models.User, { foreignKey: 'doctorId' }) 
        }
    }
    ArticleMarkdown.init({
        htmlContent: DataTypes.TEXT('long'),
        markdownContent: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),

        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ArticleMarkdown',
    });
    return ArticleMarkdown;
};