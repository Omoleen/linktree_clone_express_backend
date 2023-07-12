const {User} = require("../models/users");


const register = (req, res) => {
    // console.log(req.body)
    const {email, password, username} = req.body
    User.create({username, email}).then(async user => {
        await user.setPassword(password)
        await user.generateJWT()
        res.status(200).json(user.toJSON())
    }).catch(err => {
        console.log('username and email should be unique')
        res.status(400).send({error: [{msg: 'username and email should be unique'}]})
    })
}

const login = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}).then(async user => {
        if (!user) return res.status(401).json({error: [{msg: 'email does not exist'}]})
        if (!user.checkPassword(password)) return res.sendStatus(401)
        return res.json({accessToken: await user.generateJWT()})
    }).catch(err => res.status(401).json({error: [{msg: 'email does not exist'}]}))
}

const logout = (req, res) => {
    User.findById(req.user.user_id).then(async user => {
        console.log(user)
        await user.logout()
        res.sendStatus(200)
    }).catch(err => res.sendStatus(400))
}

module.exports = { register, login, logout }