module.exports = {
    success: (data) => {
        return {
            status: true,
            message: '',
            data: data,
        }
    },
    fail: (message) => {
        return {
            status: false,
            message: message,
            data: {},
        }
    }
}