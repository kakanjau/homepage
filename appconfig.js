/**
 * Created by qiaoliang on 14-6-9.
 */

module.exports = {
    root : {
        user : '',
        password : ''
    },

    dbconfig : {
        connect : 'localhost',
        port : '27017',
        schema : 'homepage'
    },

    pageInfo : {
        maxPerPage : 3
    },

    evernoteInfo : {
        user: '',
        password: '',
        host: '',
        ssl: true,
        from: '',
        to : '',
        tag : []
    },

    DATA_FILE_PATH : './public/blogs',
    TRASH_FILE_PATH : './test_data/trash_blogs'
};
