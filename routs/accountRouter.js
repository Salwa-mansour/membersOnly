const express =require('express');
const accountRouter = express.Router();
const path = require('path');
const accountController = require(path.resolve('controllers','accountController'));
const validationMiddleware = require(path.resolve('middleware','validation'));
const passport = require('passport');

accountRouter.route('/signup')
                .get((req,res)=>{accountController.signupGet(req,res)})
                
                .post(validationMiddleware.signupValidation,
                     validationMiddleware.handleValidationSignupErrors,
                    (req,res)=>{accountController.signupAccount(req,res)});
                
accountRouter.route('/signin')
                .get((req,res)=>{accountController.signinGet(req,res)})
                .post(
                    passport.authenticate('local', {
                    successRedirect: '/dashboard', // Redirect on successful login
                    failureRedirect: '/signin',      // Redirect on failed login
                    failureFlash: true,             // Enable flash messages for errors
                    })
                );
// GET logout request
accountRouter.get('/logout', accountController.logout);

module.exports = accountRouter;
 