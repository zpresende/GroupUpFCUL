const express = require('express');
const router = express.Router();
const ProgramController = require('./controllers/Program');

router.get('/', ProgramController.selectAll);
router.get('/:id', ProgramController.selectById);
router.post('/', ProgramController.insert);
router.put('/:id', ProgramController.edit);
router.delete('/:id', ProgramController.delete);

module.exports = router;