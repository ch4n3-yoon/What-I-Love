const { Board } = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Attachment = sequelize.define('Attachment', {
        filename: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: true,
        tableName: 'attachment',
    });

    Attachment.associate = (models) => {
        Attachment.belongsTo(models.Board, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: true,
            }
        });
    };

    return Attachment;
};