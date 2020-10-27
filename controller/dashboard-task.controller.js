const Task = require('../model/task');

module.exports.getList = (req, res) => {
    Task.find()
    .then(task =>
        res.render("task", {
            task: task,
            path: "/dashboard/task",
        })
    )
    .catch(err=>console.log(err))
}

module.exports.create = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/dashboard/task')
} 

module.exports.delete = (req, res) => {

    let id = req.params.id;

    Task.findByIdAndDelete({_id: id})
    .then(() => res.redirect('/dashboard/task'))
    .catch(err=>console.log(err)) 
}

// module.exports.edit = async (req, res) => {

//     let id = req.params.id;
//     await Product.findOneAndUpdate({_id: id}, req.body);
    
//     res.redirect('/products');
    
// }