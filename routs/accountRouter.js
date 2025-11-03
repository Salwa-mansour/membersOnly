const express =require('express');
const accountRouter = express.Router();
const path = require('path');
const accountController = require(path.resolve('controllers','accountController'));
const validationMiddleware = require(path.resolve('middleware','validation'));
const auth = require(path.resolve('middleware','auth'));



accountRouter.route('/signup')
                .get((req,res)=>{accountController.signupGet(req,res)})
                
                .post(validationMiddleware.signupValidation,
                     validationMiddleware.handleValidationSignupErrors,
                    (req,res,next)=>{accountController.signupAccount(req,res,next)}
                     );
                
accountRouter.route('/signin')
                .get((req,res)=>{accountController.signinGet(req,res)})
                .post(validationMiddleware.signInValidation,
                     validationMiddleware.handleValidationSignInErrors,
                     auth.login,
                     (req,res)=>{ res.redirect('/');}
                    );
// GET logout request
accountRouter.get('/logout', accountController.logout);
accountRouter.get('/dashboard',auth.ensureAuthenticated,(req,res)=>{ accountController.dashboardGet(req,res)});
accountRouter.post('/setMember',auth.ensureAuthenticated,(req,res)=>{ accountController.setMember(req,res)});

module.exports = accountRouter;
 