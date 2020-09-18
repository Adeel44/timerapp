const mongoose = require('mongoose');

const attendanceScheme = new mongoose.Schema({
    userId: String,
    checkIn: String,
    checkOut: String,
    lateComingReason:{
        type:String,
        max:100,
    },
    beforeTimeGoingReason:{
        type:String,
        max:1000,
    }

})

module.exports = mongoose.model('Attendance', attendanceScheme)
