const express = require('express');
const router = express.Router();
const dtaskController = require('../controller/dashboard-task.controller');
const isAuth = require("../middleware/is-auth");



router.get('/dashboard/task', isAuth,  dtaskController.getList);
router.post('/dashboard/create', isAuth,  dtaskController.create);

router.get('/dashboard/task/:id',  isAuth,  dtaskController.delete );




module.exports = router;