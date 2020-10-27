const User = require("../model/user");
const bcrypt = require("bcryptjs");


module.exports.get_login = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", { err: error });
} 


module.exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (!user) {
      req.session.error = "Invalid Credentials";
      return res.redirect("/dashboard/login");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      req.session.error = "Invalid Credentials";
      return res.redirect("/dashboard/login");
    }
  
    req.session.isAuth = true;
    req.session.name = user.name;
    res.redirect("/dashboard");

}

module.exports.get_register = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("register", { err: error });

}

module.exports.register= async (req, res) => {

    const { name, email, password } = req.body;
  if (!name || !email || !password ) {
    req.session.error = "Please fill all the field";
    return res.redirect("/dashboard/register");
  }
  if (name.length < 5) {
    req.session.error = "Name shoud be five chracter long";
    return res.redirect("/dashboard/register");
  }

  if (password.length < 6) {
    req.session.error = "Pass should b six";
    return res.redirect("/dashboard/register");
  }

  let user = await User.findOne({ email });

  if (user) {
    req.session.error = "User already exists";
    return res.redirect("/dashboard/register");
  }

  const hasdPsw = await bcrypt.hash(password, 12);

  user = new User({
    name,
    email,
    password: hasdPsw,
  });

  await user.save();
  res.redirect("/dashboard/login");

}

module.exports.dashboard = async (req, res)=>{ 
    const name = req.session.name;
    
    let user = await User.find()
  
    res.render('dashboard', {
    name:name,
    noOfUser:user.length })

}

module.exports.dashboard_logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/dashboard/login");
      })
}