const express = require('express')
const router = express.Router()
const { validateRegister, validateLogin } = require('./../validators/auth')
const handleErrors = require('../utils/handleErrors')
const {User} = require("../models/users");
const {register, login, logout } = require("../controllers/auth");
const {verifyUser} = require("../middlewares/auth");

// router.use
router.post('/register', validateRegister, handleErrors, register)

router.post('/login', login)

router.use(verifyUser)
router.post('/logout', logout)
router.post('/verify',async (req, res) => {
    const user = await User.findById(req.user.user_id)
    res.status(200).json({username: user.username})
})

module.exports = router