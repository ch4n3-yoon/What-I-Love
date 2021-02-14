const express = require('express');
const router = express.Router();

const BoardAPI = require('../api/board');


router.post('/publish', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const location = req.body.location;
    const youtube = req.body.youtube;

    const board = await BoardAPI.create(title, content, location, youtube);
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


router.get('/latest', async (req, res) => {
    const articles = await BoardAPI.get_latest();
    if (!articles) {
        res.json({
            status: false,
            message: 'Failed to load latest articles',
        });
    }

    res.json({
        status: true,
        data: articles,
    });
});


module.exports = router;
