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
    get_file_by_id: async (attachment_id) => {
        return Attachment.findOne({
            where: {id: attachment_id},
        });
    },
    get_files_by_boardId: async (board_id) => {
        return Attachment.findAll({
            where: {
                board_id: board_id,
            }
        });
    },
};

module.exports = api;
