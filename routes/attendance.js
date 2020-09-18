const express = require('express')
const router = express.Router();

const attendanceController = require('../controller/attendance.controller');


router.post('/create', attendanceController.create);
router.get('/findall', attendanceController.findAll);
router.get('/:id', attendanceController.findOne);
router.put('/:id', attendanceController.update);
router.delete('/:id', attendanceController.delete);


module.exports = router;

