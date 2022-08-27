const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', auth, userCtrl.findAll);
router.delete('/users/:id', auth, userCtrl.delete);
// page profile ?

module.exports = router;