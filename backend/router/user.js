const express = require('express');
const router = express.Router();
const cors = require('cors');
const UserAPI = require('../api/user');


router.post('/create', cors(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const user = await UserAPI.create(username, password, email, false);
    if (!user) {
        res.json({
            status: false,
            message: 'failed to create user',
        });
        return -1;
    }

    res.json({
        status: true,
    });
});


router.post('/sign-in', cors(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserAPI.signIn(username, password);
    if (!user) {
        res.json({
            status: false,
            message: 'Failed to sign in',
        });
        return -1;
    }

    return res.json({
        status: true,
    });
});


module.exports = router;
