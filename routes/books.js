const { Router } = require('express');
const { getAllBooks } = require('../controllers/books');

const router = Router();

router.get('/', getAllBooks);

module.exports = router;
