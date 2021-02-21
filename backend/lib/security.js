module.exports = {
    only_alphanumberic: (data) => {
        return data.replace(/[^.a-zA-Z0-9-_ㄱ-힣\]\[ ]/g, '');
    },
};