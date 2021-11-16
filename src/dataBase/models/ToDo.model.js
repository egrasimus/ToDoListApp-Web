const Sequelize = require('sequelize');
const { sequelize } = require('../dbSync');
const Comment = require('./Comment.model');

class ToDo extends Sequelize.Model {}

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: 'Title',
            allowNull: false,
        },
        description : {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null,
        },
        isCompleted: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isFavourite: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        priority: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: null,
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'todo' }
);
ToDo.hasMany(Comment);

module.exports = ToDo
