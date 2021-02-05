const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

const Board = sequelize.define('Board', {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    youtubeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


export default Board;
