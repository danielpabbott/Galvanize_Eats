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

module.exports = router;
