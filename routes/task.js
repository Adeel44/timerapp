const express = require('express')
const router = express.Router();

const taskController = require('../controller/task.controller');


router.post('/create', taskController.create);
router.get('/findall', taskController.findAll);
router.get('/:id', taskController.findOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);


 module.exports = router;


