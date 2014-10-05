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
        user: 'qiaoliangsmx',
        password: 'jesusloveyx',
        host: 'smtp.163.com',
        ssl: true,
        from: 'qiaoliang<qiaoliangsmx@163.com>',
        to : 'kakanjau.9d9c626@m.yinxiang.com',
        tag : ['#qiaokaka', '#原创']
    },

    DATA_FILE_PATH : './public/blogs',
    TRASH_FILE_PATH : './test_data/trash_blogs'
};
