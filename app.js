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


app.get('/' , (req , res)=>{
  res.json({success_note: "welcome to Timer app"})
})

//Route middlewae
 app.use('/api/user' , authRoute)

 app.use('/api/task' , taskRoute)
 app.use('/api/attendance' , attendanceRoute)
 



const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`App is runing at ${port}`)

})