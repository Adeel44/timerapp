const express = require('express')
const router = express.Router();
const verify = require('../middleware/verifyToken')

const attendanceController = require('../controller/attendance.controller');


router.post('/create', verify,  attendanceController.create);
router.get('/findall', verify,  attendanceController.findAll);
router.get('/:id', verify,  attendanceController.findOne);
router.put('/:id', verify,  attendanceController.update);
router.delete('/:id',verify,  attendanceController.delete);


module.exports = router;

