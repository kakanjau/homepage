/**
 * Created by qiaoliang on 14-6-9.
 */

module.exports = {
    root : {
        user : '',
        password : ''
    },

    dbconfig : {
        connect : '',
        port : '',
        schema : ''
    },

    pageInfo : {
        maxPerPage : 5
    },

    mailOptions: {
        user: '',
        password: '',
        host: '',
        ssl: true,
        from: ''
    },

    evernoteOptions: {
        mail: ''
    },

    articleOptions: {
        tags: []
    },

    DATA_FILE_PATH : './public/blogs',
    TRASH_FILE_PATH : './test_data/trash_blogs'
};
