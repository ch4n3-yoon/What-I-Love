const fs = require('fs');
const moment = require('moment');

const log_for_sequelize = (message) => {
    const current_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const log = `[${current_time}] ${message}\n`;

    fs.appendFile('./sequelize.log', log, 'utf8', (error) => {
        if (error) {
            console.log('[ ERROR ] message :', error.message);
        }
    })
};

export default log_for_sequelize;