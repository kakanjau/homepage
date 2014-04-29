var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/blog', function(req, res) {
  res.render('blog/blog_index', { name: 'qiao liang\'s blog' });
});

router.get('/todo', function(req, res) {
   res.render('todo/todo_index', {name: 'qiao liang\'s todolist'});
});

router.get('/', function(req, res) {
   res.redirect('blog');
});
module.exports = router;
