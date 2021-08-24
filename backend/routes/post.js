const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.post('/', postCtrl.create);
router.get('/', postCtrl.findAll);
router.get('/:id', postCtrl.findOne);
router.put('/:id', postCtrl.update);
router.delete('/:id', postCtrl.delete);

module.exports = router;