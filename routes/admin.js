const express = require('express')
const router = express.Router()
const isAuth = require("../middleware/is-auth");

const admincontroller = require('../controller/admin.controller');


router.get("/dashboard/login", admincontroller.get_login)
router.post("/dashboard/login", admincontroller.login)
router.get("/dashboard/register", admincontroller.get_register)
router.post("/dashboard/register", admincontroller.register)

router.get('/dashboard', isAuth, admincontroller.dashboard)

router.post("/dashboard/logout", admincontroller.dashboard_logout)



module.exports = router;