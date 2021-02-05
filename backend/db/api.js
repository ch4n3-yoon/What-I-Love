const Sequelize = require('sequelize');
const mysql = require('mysql');
const dotenv = require('dotenv');
const log_for_sequelize = require('../log/sequelize');

// Models
const User = require('./models/User');
const Board = require('./models/Board');


// Load system configure from .env
dotenv.config();

const database = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
};


// Create Connection for MySQL
const connection = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    port: database.port,
    database: database.name,
});

connection.connect();


// NodeJS Sequelize ORM
const API = new Sequelize(database.name, database.user, database.password, {
    host: database.host,
    port: database.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: 'utf8mb4_bin',
        collate: 'utf8mb4_bin',
        timestamps: true
    },
    operatorsAliases: false,
    timezone: '+09:00',
    logging: log_for_sequelize,
    charset: 'utf8mb4'
});


API.User = User;


export {connection, API};

