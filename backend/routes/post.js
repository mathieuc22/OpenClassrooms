const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.post('/', auth, postCtrl.create);
router.get('/', auth, postCtrl.findAll);
router.get('/:id', auth, postCtrl.findOne);
router.put('/:id', auth, postCtrl.update);
router.post('/:id', auth, postCtrl.comment);
router.delete('/:id', auth, postCtrl.delete);
router.post('/:id/like', auth, postCtrl.like);
router.delete('/comment/:id', auth, postCtrl.deleteComment);

module.exports = router;