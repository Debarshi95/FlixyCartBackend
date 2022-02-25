const { Router } = require('express');
const { loginUser, registerUser } = require('../controllers/auth.controller');
const { validateLogin, validateRegister } = require('../utils/middlewares');

const router = Router();

router.post('/login', validateLogin, loginUser);
router.post('/register', validateRegister, registerUser);

module.exports = router;
