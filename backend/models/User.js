module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        no: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8mb4_bin',
        timestamps: true,
    });

    user.associate = (models) => {
        models.User.hasMany(models.Code, {
            foreignKey: 'fk_userid',
            onDelete: 'cascade',
        });
    };

    return user;
};