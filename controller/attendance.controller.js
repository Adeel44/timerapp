const Attendance = require('../model/attendance');
const error = require('../constant/error')

module.exports.create = (req, res) => {

    const attendance = new Attendance({

        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        lateComingReason: req.body.lateComingReason,
        beforeTimeGoingReason: req.body.beforeTimeGoingReason
                  
        })
    
        attendance.save()
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Records Not Saved",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({
                message: "Record saved successfully",
                status: 'status',
                data: data
            })
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, data: {} })
        })
}

module.exports.findAll = (req, res) => {

    Attendance.find()
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Records Not Found",
                    data: [],
                    status: 'error'
                });
            }
            res.status(200).send({
                message: 'successfully fetched!',
                data: data,
                status: "success"
            })
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        })

    
}

module.exports.findOne = (req, res) => {

    Attendance.findById(req.params.id)

    .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.send({ data, message: 'successfully !', status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, data: {}, status: 'error' })
        })
}

module.exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Record Must Not be Empty",
            status: 'error'
        });
    }

    let new_data = req.body;

    Attendance.findByIdAndUpdate(req.params.id, { $set: new_data }, { new: true , useFindAndModify: false})
        .then(data => {
            if (!data || data == null) {
                console.log(data)
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({
                message: "Record Updated Successfully",
                data: data,
                status: 'success'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        });
}

module.exports.delete = (req, res) => {

    Attendance.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({ message: "Record deleted successfully!", data, status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        });
}