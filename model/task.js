const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
    },
    description:{
        type:String,
        required:true,
        min:6,
        max:100,
    },
    time:{
        type:String
    }

})

module.exports = mongoose.model('Task', taskScheme)