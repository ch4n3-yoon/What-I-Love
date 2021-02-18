const crypto = require('crypto');

module.exports = {
    sha512: (data) => {
        return crypto.createHash('sha512').update(data).digest('hex');
    },
}