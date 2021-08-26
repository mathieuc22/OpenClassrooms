const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.create);
router.get('/', commentCtrl.findAll);
// router.get('/:id', commentCtrl.findOne);
// router.put('/:id', commentCtrl.update);
// router.delete('/:id', commentCtrl.delete);

module.exports = router;