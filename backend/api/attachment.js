const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Attachment } = require('../models');

const api = {
    create: async (filename, path, board_id) => {
        return Attachment.create({
            filename: filename,
            path: path,
            board_id: board_id,
        });
    },
};

module.exports = api;
