var express = require('express');
var router = express.Router();
var fs = require('fs');
var blog = require('./blog');
/* GET home page. */
router.get('/blog', function(req, res){
  var data = {
    name: 'qiao liang',
    blog_active : 'active'
  };
  res.render('blog/blog_index', data);
});

router.get('/blog_list', function(req, res){
  var data = fs.readFileSync('./test_data/blog_index_data.txt', {encoding: 'utf8'});
  res.send(data);
});

router.get('/blog_detail/:blogId', function(req, res){
  console.log('in blog_detail:' + req.params.blogId);
  var id = req.params.blogId;
  var content = fs.readFileSync('./test_data/blog_detail_id' + id + '.txt', {encoding: 'utf8'});
  console.log(content);
  res.send({
    id: id,
    name: '前端开发十日谈',
    content: content
  });
});

router.get('/todo', function(req, res) {
  var data = {
  	name: 'qiao liang',
  	todo_active : 'active'
  };
   res.render('todo/todo_index', data);
});

router.get('/', function(req, res) {
   res.redirect('blog');
});
module.exports = router;
