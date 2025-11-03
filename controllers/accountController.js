const db = require("../db/queries");
const bcrypt = require('bcryptjs');
const dotenv =require('dotenv');
dotenv.config({ path: 'config.env' });

async function signupGet(req, res){
  res.render("account/sign-up", {
    title: "sign up",
    user:{}
  });
}

async function signupAccount(req, res,next){
  try{
     const newUser ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password, 10)
          }
      const user =  await db.signupUserAccount(newUser);

        req.login(user, (err) => {
            if (err) {
                // If login fails, pass the error to Express's error handler
                return next(err);
            }
            
            // 3. Redirect the now-logged-in user to a protected page
            req.flash('message', 'Registration successful! You are now logged in.');
            res.redirect('/dashboard');
        });
         }catch(error) {
        console.error("Error :", error);
        throw error;
  }
}
async function signinGet(req, res){
  const wrongEmail = req.flash('oldEmail')[0] || ""; // Flash returns an array, so take the first element
  
 res.render("account/sign-in", {
    title: "sign in",
    user: {email:wrongEmail},
    messages: req.flash('error') 
  });
}
async function dashboardGet(req,res) {
  res.render("account/dashboard", { user: req.user });
}
async function logout(req, res){
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
async function setMember(req,res) {
  const isMember = req.body.isMember === process.env.MEMBER_SECRET;
  const isAdmin = req.body.isAdmin === process.env.Admin_SECRET;

  try{
     if(isMember){
     await db.memberSubscribe(req.user.id)
      }
      if(isAdmin){
        await db.setAdmin(req.user.id)
      }
    
  } catch(error) {
        console.error("Error :", error);
        throw error;
  }
   res.redirect('/');
}
module.exports = {
  signupGet,
 signupAccount,
  signinGet,
 logout,
 dashboardGet,
 setMember
}