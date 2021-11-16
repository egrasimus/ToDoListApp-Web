const Sequelize = require('sequelize');
const { sequelize } = require('../dbSync');

class Comment extends Sequelize.Model {}

Comment.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        text: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        status : {
            type: Sequelize.DataTypes.ENUM('Active', 'Done'),
            defaultValue: 'Active',
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'comment' }
);

module.exports = Comment