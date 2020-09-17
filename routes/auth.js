var express = require('express');
var router = express.Router();
const verify = require('../middleware/verifyToken')
const authcontroller = require('../controller/auth.controller');

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);

router.get('/posts', verify, authcontroller.verify_posts );


module.exports = router;

