const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const rateLimit = require("express-rate-limit");
const logger = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const consoleAPI = require('./lib/console');
const app = express();

const {sequelize} = require('./models/index');
const driver = () => {
    sequelize.sync({alter: true})
        .then(() => {
            consoleAPI.success('INFO', 'sequelize synchronized !');
        })
        .catch((error) => {
            console.log(`[ ERROR ] failed to synchronize sequelize`);
            console.log(`[ ERROR ] ${error}`);
        });
};


app.use(express.Router());
app.use(express.json());
app.use(cookieParser());

app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 60,
    message: "Calm down...",
}));

app.use(logger({
    format: 'short',
    stream: fs.createWriteStream('./log/app.log', {'flags': 'w'})
}));

app.use(session({
    secret: "asdf",
    resave: true,
    saveUninitialized: true,
    cookie: {path: '/', httpOnly: true, secure: false, maxAge: null, expires: false}
}));


// 보안 상의 이유로 X-powered-by 헤더 없앰
app.disable('x-powered-by');

app.use(fileUpload());
app.use('/upload', express.static(__dirname + '/upload'));
app.use(express.static('public'));

app.use(cors());

const user = require('./router/user');
const board = require('./router/board');
const attachment = require('./router/attachment');

app.use('/user', user);
app.use('/article', board);
app.use('/file', attachment);

app.use(async (req, res) => {
    res.status(404);
    res.json({
        status: false,
        message: '404 Not Found',
    });
});

driver();

app.listen(3000, () => {
    console.log('[ INFO ] server started !');
});
