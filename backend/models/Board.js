
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Board', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        youtubeUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: true,
        tableName: 'board',
    });
};