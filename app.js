const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// DATA BASE CONNECT 
mongoose.connect('mongodb://node-shop-api:' + process.env.MONGO_ATLAS_PW + '@rest-shop-api-shard-00-00-q9gyu.mongodb.net:27017,rest-shop-api-shard-00-01-q9gyu.mongodb.net:27017,rest-shop-api-shard-00-02-q9gyu.mongodb.net:27017/test?ssl=true&replicaSet=rest-shop-api-shard-0&authSource=admin')

// MIDDLEWARES
app.use(morgan('dev')) // log requests first
// app.use(express.static('uploads')) // make this folder available for everyone
app.use('/uploads', express.static('uploads')) // make this folder available for everyone in the route /uploads
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//region ROUTES MIDDLEWARE
/* 
    handle all requests responding a header that avoid the CORS (cross origin) problem
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

/* 
    my routes that shoud handle requests
    the last route is the default for not defined routes
 */
app.use('/products', require('./api/routes/product'))
app.use('/orders', require('./api/routes/order'))
app.use('/user', require('./api/routes/user'))
app.use((req, res, next) => { 
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// catch all errors throwed in the app (include the not found error throw before)
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
//endregion


module.exports = app;
