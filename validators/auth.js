const {body} = require('express-validator')

const validateRegister = [
    body('email').isEmail().withMessage('Input a valid email').exists().withMessage('Email is compulsory'),
    body('password').isLength({
        min: 6
    }).withMessage('password should contain a minimum of minimum of 6 characters'),
    body('username').exists().withMessage('username is compulsory')
]

const validateLogin = [
    body('email').isEmail().withMessage('Input a valid email').exists().withMessage('Email is compulsory'),
    body('password').isLength({
        min: 6
    }).withMessage('password should contain a minimum of 6 characters')
]

module.exports = { validateRegister, validateLogin }