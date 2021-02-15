const chalk = require('chalk');

module.exports = {
    success: (type, message) => {
        console.log(chalk.green(`[ ${type} ] ${message}`));
    },
};