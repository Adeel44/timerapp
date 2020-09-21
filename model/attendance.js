const mongoose = require('mongoose');

const attendanceScheme = new mongoose.Schema({
    
    checkIn: String,
    checkOut: String,
    lateComingReason:{
        type:String,
        max:100,
    },
    beforeTimeGoingReason:{
        type:String,
        max:1000,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

})

module.exports = mongoose.model('Attendance', attendanceScheme)
