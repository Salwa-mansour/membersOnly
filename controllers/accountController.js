const db = require("../db/queries");
const bcrypt = require('bcryptjs');


async function signupGet(req, res){
  res.render("account/sign-up", {
    title: "sign up",
    user:{}
  });
}

async function signupAccount(req, res){
     const newUser ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password, 10)
     }
  await db.signupUserAccount(newUser);

  res.redirect("/signin");
}
async function signinGet(req, res){
  const wrongEmail = req.flash('oldEmail')[0] || ""; // Flash returns an array, so take the first element
  
 res.render("account/sign-in", {
    title: "sign in",
    user: {email:wrongEmail},
    messages: req.flash('error') 
  });
}

async function logout(req, res){
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/signin');
  });
};
module.exports = {
  signupGet,
 signupAccount,
  signinGet,
 logout
}