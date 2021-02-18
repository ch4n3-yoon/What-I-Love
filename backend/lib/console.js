const chalk = require('chalk');

module.exports = {
    success: (type, message) => {
        console.log(chalk.green(`[ ${type} ] ${message}`));
    },
    fail: (type, message) => {
        console.log(chalk.red(`[ ${type} ] ${message}`));
    },
};