module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        article: {

        },
        filename: {

        },
        path: {

        },
    }, {
        charset: 'utf8',
        collate: 'utf8mb4_bin',
        timestamps: true,
    });
};