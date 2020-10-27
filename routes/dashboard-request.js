const express = require('express');
const router = express.Router();
const User = require('../model/user');
const isAuth = require("../middleware/is-auth");


const drequestController = require('../controller/dashboard-request.controller');

router.get('/dashboard/request', isAuth,  drequestController.getList);

router.put('/dashboard/request/:id', isAuth,  drequestController.edit)


// router.get('/dashboard/request', isAuth, (req, res)=>{ 

//     User.find()
//         .then(user =>
//             res.render("request", {
//                 user: user,
//                 path: "/dashboard/request",
//             })
//         )
//         .catch(err=>console.log(err))
    
// })

// router.put('/dashboard/request/:id', isAuth,  async (req, res) => {
//     const { id } = req.params;
//     await User.findByIdAndUpdate( {_id:id} , req.body);
//     console.log('req.body', req.body)
    
//     res.redirect('/dashboard/request');
// })


module.exports = router;