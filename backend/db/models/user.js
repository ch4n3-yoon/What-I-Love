const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

const User = sequelize.define('User', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});