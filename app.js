const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const taskRoute = require('./routes/task')
const attendanceRoute = require('./routes/attendance')



dotenv.config()


mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error , clint)=>{
      if(error){
     return console.log("Unable  to conect to db")
      }
      console.log("conected to db")

})


app.use(express.json())

 //Route middlewae
 app.use('/' , (req , res)=>{
   res.send({success_note: "welcome to Timer app"})
 })
 app.use('/api/user' , authRoute)

 app.use('/api/task' , taskRoute)
 app.use('/api/attendance' , attendanceRoute)
 


app.listen(3000, () => console.log('Server is running on 3000'))