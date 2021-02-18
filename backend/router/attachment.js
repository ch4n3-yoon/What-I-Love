const express = require('express');
const router = express.Router();
const path = require('path');

const AttachmentAPI = require('../api/attachment');
const cryptoAPI = require('../lib/crypto');
const consoleAPI = require('../lib/console');

router.post('/upload/:board_id', async (req, res) => {

    const {files: {file: file}} = req;
    const {params: board_id} = req;

    console.log('[ DEBUG ] file :', file);


    const upload_directory = '../upload';
    const filename = file.name;
    const real_filename = cryptoAPI.sha512(filename + Date.now());
    const filepath = path.join(__dirname, '../upload/') + real_filename;

    file.mv(filepath, error => {
        consoleAPI.fail('ERROR', error);
    });

    const attachment = await AttachmentAPI.create(filename, filepath, board_id);
    console.log('[ DEBUG ] attachment :', attachment);

    return 'asdf';
});


module.exports = router;
