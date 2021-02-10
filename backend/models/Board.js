const user = require('./User');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
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
    }, {
        charset: 'utf8',
        collate: 'utf8mb4_bin',
        timestamps: true,
    });
};