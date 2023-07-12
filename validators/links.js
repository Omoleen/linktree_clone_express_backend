const {body} = require('express-validator')

const validateLinkCreate = [
    body('label').exists().withMessage('link requires a label'),
    body('url').exists().withMessage('link requires a url'),
    // body('category').exists().withMessage('link requires a category')
]


module.exports = { validateLinkCreate }