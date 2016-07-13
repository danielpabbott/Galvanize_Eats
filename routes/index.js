var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function(req, res, next) {
  return knex('book').select().then(function(book) {
    res.render('books', {book: book})
  })
})

router.get('/addbook', function(req, res, next) {
  res.render('addbook');
})

router.post('/post', function(req, res, next) {
	return knex('book').insert(req.body).then(function() {
		res.redirect('books');
	});
});

router.get('/:id/bookdelete', function(req, res, next) {
  knex('book').where({id: req.params.id}).del().then(function() {
  res.redirect('/books')
  })
});

router.get('/:id/bookdetail', function(req, res, next) {
  return knex('book').select().where({id: req.params.id}).first().then(function (book) {
    res.render('bookdetail', {book: book})
  });
});

module.exports = router;
