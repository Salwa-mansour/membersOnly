const { body, validationResult } = require("express-validator");


// Creates a basic validation chain for a required string field.
const createRequiredStringValidation = (fieldName, message) => [
  body(fieldName)
    .isLength({ min: 3 })
    .withMessage(message || `${fieldName}  must be at least 3 characters long.`)
    .trim()
];

const passwordValidationChain =  [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches('[a-z]')
    .withMessage('Password must contain at least one lowercase letter.')
];
const confirmPassword = [
    body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
     
        throw new Error('Password confirmation does not match password.');
      }
      return true;
    })
  ];

// Creates a validation chain for a new author, including multiple fields.
const signupValidation = [
  ...createRequiredStringValidation('firstName', 'first name is required'),
  ...createRequiredStringValidation('lastName', 'last name is required'),
  ...createRequiredStringValidation('email', ' email is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  ...passwordValidationChain,
  ...confirmPassword
];

  const handleValidationSignupErrors  = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation fails, rerender the form
   
      return res.render('account/sign-up', {
        errors: errors.array(),
        user: {
           firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
        }
      });
    }
    return next();
  }
const signInValidation = [
  ...createRequiredStringValidation('email', ' email is required'),
      body('email').isEmail().withMessage('Invalid email format'),
  ...createRequiredStringValidation('password', 'password is required'),
];
  const handleValidationSignInErrors  = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation fails, rerender the form
   
      return res.render('account/sign-in', {
        errors: errors.array(),
        user: {
            email:req.body.email,
            password:req.body.password,
        }
      });
    }
    return next();
  }
  module.exports = {
    signupValidation,
    handleValidationSignupErrors,
    signInValidation,
    handleValidationSignInErrors
}