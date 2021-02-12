module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        username: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: true,
        tableName: 'user',
    });

    // user.associate = (models) => {
    //     models.User.hasMany(models.Code, {
    //         foreignKey: 'fk_userid',
    //         onDelete: 'cascade',
    //     });
    // };

    return user;
};