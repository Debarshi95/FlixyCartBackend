const { Router } = require('express');
const { loginUser, registerUser } = require('../controllers/auth.controller');

const router = Router();

router.get('/login', loginUser);
router.get('/register', registerUser);

module.exports = router;
