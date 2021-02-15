module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
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

    Board.associate = (models) => {
        Board.hasMany(models.Attachment, {
            foreignKey: {
                // foreignKey: 'boardId',
                onDelete: 'CASCADE',
            },
        });
    };

    return Board;
};