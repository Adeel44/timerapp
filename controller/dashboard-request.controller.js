const User = require('../model/user');

module.exports.getList = (req, res)=>{ 

    User.find()
        .then(user =>
            res.render("request", {
                user: user,
                path: "/dashboard/request",
            })
        )
        .catch(err=>console.log(err))
} 

module.exports.edit = async (req, res)=>{ 
    const { id } = req.params;
    await User.findByIdAndUpdate( {_id:id} , req.body);
    console.log('req.body', req.body)
    
    res.redirect('/dashboard/request');

} 