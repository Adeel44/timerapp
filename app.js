const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const User = require('./model/user');
var methodOverride = require('method-override')
const Attendance = require('./model/attendance');
const isAuth = require("./middleware/is-auth");


//const email_config = require('./config/email')

const Task = require('./model/task');

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);





const authRoute = require('./routes/auth')
const taskRoute = require('./routes/task')
const attendanceRoute = require('./routes/attendance')
const drequestRoute = require('./routes/dashboard-request');
const dtaskRoute = require('./routes/dashboard-task');
const adminRoute = require('./routes/admin')


const task = require('./model/task');



dotenv.config()

// View Engine Setup 
//app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: process.env.DB_CONNECT,
  collection: "timer_app",
});




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

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


app.use(express.json())

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}))

//Route middlewae
app.use('/api/user' , authRoute)

app.use('/api/task' , taskRoute)
app.use('/api/attendance' , attendanceRoute)
app.use('/' , drequestRoute)
app.use('/' , dtaskRoute)
app.use('/' , adminRoute)


app.get('/' , (req , res)=>{
  res.json({success_note: "welcome to Timer app"})
})


app.get('/dashboard',(req, res)=>{ 
  
 res.render('dashboard') 
   
}) 
app.get('/dashboard/register',(req, res)=>{ 
  
  res.render("register") 
    
 })

app.get('/dashboard/login',(req, res)=>{ 
  
  res.render("login") 
    
})




app.get('/dashboard/user', isAuth , (req, res)=>{

  User.find()
  .then(user =>
      res.render("user", {
          user: user,
          path: "/dashboard/user",
      })
  )
  .catch(err=>console.log(err))

})

app.get('/dashboard/attendance', isAuth, (req, res)=>{ 

//   Attendance.find({}, (err, attendance)=>{
//     if(err){console.log(err);}

//     res.render('attendance', {
//         attendance:attendance,
    
//     });
//  }); 


Attendance.find({})
    .populate('user')
    .exec((err, attendance)=>{
      if (err) {console.log(err)};
      res.render('attendance', {
        attendance:attendance,
      });
    });

})



const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`App is runing at ${port}`)

})