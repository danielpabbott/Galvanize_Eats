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

router.get('/authors', function(req, res, next) {
  return knex('author').select().then(function(author) {
    res.render('authors', {author: author})
  })
})

router.get('/addbook', function(req, res, next) {
  res.render('addbook');
})

router.post('/newbook', function(req, res, next) {
	return knex('book').insert(req.body).then(function() {
		res.redirect('books');
	});
});

router.get('/addauthor', function(req, res, next) {
  res.render('addauthor');
})

router.post('/newauthor', function(req, res, next) {
	return knex('author').insert(req.body).then(function() {
		res.redirect('authors');
	});
});

router.get('/:id/deletebook', function(req, res, next) {
  knex('book').where({id: req.params.id}).del().then(function() {
  res.redirect('/books')
  })
});

router.get('/:id/deleteauthor', function(req, res, next) {
  knex('author').where({id: req.params.id}).del().then(function() {
  res.redirect('/authors')
  })
});

router.get('/:id/detailbook', function(req, res, next) {
  return knex('book').select().where({id: req.params.id}).first().then(function (book) {
    res.render('detailbook', {book: book})
  });
});

router.get('/:id/detailauthor', function(req, res, next) {
  return knex('author').select().where({id: req.params.id}).first().then(function (author) {
    res.render('detailauthor', {author: author})
  });
});

router.get('/:id/editbook', function(req, res, next) {
  return knex('book').select().where({id: req.params.id}).first().then(function (book) {
    res.render('editbook', {book: book})
  });
});

router.post('/:id/editbook', function(req, res, next) {
  return knex('book').where({id: req.params.id}).update({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }).then(function() {
    res.redirect('/books')
  })
})

router.get('/:id/editauthor', function(req, res, next) {
  return knex('author').select().where({id: req.params.id}).first().then(function (author) {
    res.render('editauthor', {author: author})
  });
});

router.post('/:id/editauthor', function(req, res, next) {
  return knex('author').where({id: req.params.id}).update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  }).then(function() {
    res.redirect('/authors')
  })
})

module.exports = router;
