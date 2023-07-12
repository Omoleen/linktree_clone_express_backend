const mongoose = require('mongoose')
require('dotenv').config()

const mongodb_url = process.env.DEBUG === "false" ? process.env.PROD_MONGODB_URL : process.env.DEV_MONGODB_URL
mongoose.connect(mongodb_url)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))