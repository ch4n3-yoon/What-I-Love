const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const AttachmentAPI = require('../api/attachment');
const cryptoAPI = require('../lib/crypto');
const consoleAPI = require('../lib/console');
const responseAPI = require('../lib/response');
const securityAPI = require('../lib/security');


router.get('/:attachment_id', async (req, res) => {
    const {params: {attachment_id}} = req;

    const attachment = await AttachmentAPI.get_file_by_id(attachment_id);
    if (!attachment) {
        consoleAPI.fail('ERROR', `Cannot find the attachment (id : ${attachment_id})`);
        return res.json(responseAPI.fail(`Cannot find the attachment (id : ${attachment_id})`));
    }

    const filename = securityAPI.only_alphanumberic(attachment.filename);
    const extension = filename.split('.').pop().toLowerCase();

    res.contentType(`image/${extension}`);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    try {
        const content = await fs.readFileSync(attachment.path);
        res.end(content);
    } catch (error) {
        consoleAPI.fail('ERROR', error);
        return res.json(responseAPI.fail('Cannot read attachment file.'));
    }
});


router.post('/upload/:board_id', async (req, res) => {
    const {files: {file: file}} = req;
    const {params: {board_id}} = req;

    const filename = file.name;
    const real_filename = cryptoAPI.sha512(filename + Date.now());
    const filepath = path.join(__dirname, '../upload/') + real_filename;

    file.mv(filepath, error => {
        consoleAPI.fail('ERROR', error);
    });

    const attachment = await AttachmentAPI.create(filename, filepath, board_id);
    console.log('[ DEBUG ] attachment :', attachment);

    return res.json(responseAPI.success(attachment));
});


router.get('/delete/:board_id/all', async (req, res) => {
    const {params: {board_id}} = req;

    const files = await AttachmentAPI.get_files_by_boardId(board_id);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            fs.unlinkSync(file.path);
            consoleAPI.success('INFO', `Success to delete ${file.filename}`);
        } catch (error) {
            consoleAPI.fail('ERROR', error);
            return res.json(responseAPI.fail(`Failed to remove file (filename : ${file.filename})`));
        }
    }

    return res.json(responseAPI.success({}));
});


module.exports = router;
