const {Link, User} = require("../models/users");


const getLinks = async (req, res) => {
    if (req.params.id) {
        Link.findOne({user: await User.findById(req.user.user_id), _id: req.params.id}).then(link => {
            if (!link) return res.status(400).json({error: [{msg: 'link does not exist'}]})
            return res.json(link.toJSON())
        }).catch(err => res.status(400).json({error: [{msg: 'link does not exist'}]}))

    } else {
        Link.find({user: await User.findById(req.user.user_id)}).then(links => {
            return res.json(links)
        })
    }
}
const patchLinks = async (req, res) => {
    const { label, url } = req.body
    let update = {}
    if (label) update = {...update, label}
    if (url) update = {...update, url}
    Link.findOneAndUpdate({user: await User.findById(req.user.user_id), _id: req.params.id}, update, {new:true}).then(link => {
        res.json(link.toJSON())
    }).catch(err => res.sendStatus(400))
}
const deleteLink = async (req, res) => {
    Link.findOneAndRemove({user: await User.findById(req.user.user_id), _id: req.params.id}).then(() => {
        res.sendStatus(200)
    }).catch(err => res.sendStatus(400))
}
const createLink = async (req, res) => {
    const { label, url } = req.body
    const user = await User.findById(req.user.user_id)

    Link.findOne({user, label})
        .then(link => {
            if (link) return res.status(400).json({error: [{msg: 'label must be unique'}]})
            Link.create({label, url, user}).then(link => {
                return res.send(link)
            }).catch(err => {
                console.log(err)
                res.json({error: [{msg: 'label already exists'}]}).status(400)
            })
        })
        .catch(err => {
            console.log(err)
        })

}
const getUserLinks = async (req, res) => {
    Link.find({user: await User.findOne({username: req.params.username})}).then(links => {
        const updateLinks = links.map(link => ({label: link.label, url: link.url}))
        res.json(updateLinks)
    }).catch(err => res.json({error: [{msg: 'user does not exist'}]}).status(400))
}

module.exports = { getLinks, patchLinks, deleteLink, createLink, getUserLinks }