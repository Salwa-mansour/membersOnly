const express =require('express');
const accountRouter = express.Router();
const path = require('path');
const accountController = require(path.resolve('controllers','accountController'));
const validationMiddleware = require(path.resolve('middleware','validation'));
const auth = require(path.resolve('middleware','auth'));

// const flash = require('connect-flash');
// const session = require('express-session');

accountRouter.route('/signup')
                .get((req,res)=>{accountController.signupGet(req,res)})
                
                .post(validationMiddleware.signupValidation,
                     validationMiddleware.handleValidationSignupErrors,
                    (req,res)=>{accountController.signupAccount(req,res)});
                
accountRouter.route('/signin')
                .get((req,res)=>{accountController.signinGet(req,res)})
                .post(validationMiddleware.signInValidation,
                     validationMiddleware.handleValidationSignInErrors,
                     auth.login
                    );
// GET logout request
accountRouter.get('/logout', accountController.logout);

module.exports = accountRouter;
 