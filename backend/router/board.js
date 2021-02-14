const express = require('express');
const router = express.Router();

const BoardAPI = require('../api/board');


router.post('/publish', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const location = req.body.location;
    const youtube = req.body.youtube;

    const board = BoardAPI.create(title, content, location, youtube);
    console.log('[ DEBUG ] board :', board);
    console.log('[ INFO ] board has created !');

    if (!board) {
        res.json({
            status: false,
            message: 'Failed to create article',
        });
        return -1;
    }

    res.json({
        status: true,
    });
});

module.exports = router;
