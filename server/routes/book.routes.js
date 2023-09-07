const router = require('express').Router();

const {createBook, getBooks, getBook, updateBook, deleteBook} = require('../controllers/book.controllers');

// POST: create a book
router.post('/', createBook);

// GET: get all the book
router.get('/', getBooks);

// GET: get specific book
router.get('/:id', getBook);

// PATCH: update specific book
router.patch('/:id', updateBook);

// DELETE: delete specific book
router.delete('/:id', deleteBook);

module.exports = router;