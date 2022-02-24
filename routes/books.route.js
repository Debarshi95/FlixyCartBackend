const { Router } = require('express');
const { getAllBooks, getBook } = require('../controllers/books.controller');

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBook);

module.exports = router;
