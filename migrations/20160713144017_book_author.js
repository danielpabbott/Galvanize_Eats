
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book_author', function(table) {
    table.increments();
    table.integer('book_id').references('book.id');
    table.string('author_id'.references('author.id'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book_author');
};
