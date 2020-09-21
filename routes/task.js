const express = require('express')
const router = express.Router();
const verify = require('../middleware/verifyToken')

const taskController = require('../controller/task.controller');


router.post('/create', verify,  taskController.create);
router.get('/findall', verify, taskController.findAll);
router.get('/:id', verify, taskController.findOne);
router.put('/:id', verify, taskController.update);
router.delete('/:id', verify, taskController.delete);


 module.exports = router;


