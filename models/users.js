const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    accessToken: String
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        methods: {
            checkPassword(password) {
                return bcrypt.compareSync(password, this.password)
            },
            async setPassword(password) {
                this.password = await bcrypt.hash(password, await bcrypt.genSalt())
                this.isActive = true
                await this.save()
            },
            async generateJWT() {
                this.accessToken = jwt.sign({
                        user_id: this._id,
                        email: this.email
                    },
                    process.env.SECRET_KEY, {
                    expiresIn: process.env.JWT_TOKEN_EXPIRES
                    })
                await this.save()
                return this.accessToken
            },
            async logout() {
                this.accessToken = ''
                await this.save()
            }
        }
    })

const User = mongoose.model('User', UserSchema)

const LinkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    label: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'LinkCategory',
    //     required: true
    // }
}, {
    timestamps: true
})
LinkSchema.pre('save', function() {
    if (!this.url.includes('https://')) this.url = 'https://' + this.url
})

const Link = mongoose.model('Link', LinkSchema)

const LinkCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

LinkCategory = mongoose.model('LinkCategory', LinkCategorySchema)

module.exports = { User, LinkSchema, Link }