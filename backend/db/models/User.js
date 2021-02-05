const { Sequelize, DataTypes } = require('sequelize');
const _table = require('_table');

const sequelize = new Sequelize('mysql');
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED_INT,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, _table);

export default User;
