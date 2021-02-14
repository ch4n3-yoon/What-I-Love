const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Board } = require('../models');

const api = {
    create: async (title, content, location, youtube) => {
        return Board.create({
            title: title,
            content: content,
            location: location,
            youtube_url: youtube,
        });
    },
    delete: async (username) => {
        User.delete();
    },
};

module.exports = api;

