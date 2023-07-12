const express = require('express')
const {verifyUser} = require("../middlewares/auth");
const {validateLinkCreate} = require("../validators/links");
const handleErrors = require("../utils/handleErrors");
const {Link, User} = require("../models/users");
const {getLinks, patchLinks, deleteLink, createLink, getUserLinks} = require("../controllers/links");

const router = express.Router()

router.get('/:username', getUserLinks)

router.use(verifyUser)
router.get('/:id?', getLinks)
router.post('', validateLinkCreate, handleErrors, createLink)
router.patch('/:id', patchLinks)
router.delete('/:id', deleteLink)


module.exports = router

