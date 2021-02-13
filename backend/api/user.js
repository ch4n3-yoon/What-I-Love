const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../models');

const api = {
    sha512: (data) => {
        return crypto.createHash('sha512').update(data).digest('hex');
    },
    create: async (username, password, email, admin) => {
        const hashed_password = api.sha512(password);
        return User.create({
            username: username,
            password: hashed_password,
            email: email,
            admin: admin,
        });
    },
    delete: async (username) => {
        User.delete();
    },
    signIn: async (username, password) => {
        const hashed_password = api.sha512(password);
        return User.findOne({
            where: {
                [Op.or]: [{username: username}, {email: username},],
                password: hashed_password,
            },
        });
    },
};

module.exports = api;

