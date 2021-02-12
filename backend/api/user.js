const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../models');

const api = {
    create: async (username, password, email, admin) => {
        const hashed_password = crypto.createHash('sha512').update(password).digest('hex');
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
};

module.exports = api;

