const app = require('express')()
const morgan = require('morgan')
const bodyParser = require('body-parser')


app.use(morgan('dev')) // log requests first

// parse requests urlencoded and json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// avoid cors error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')

    if(req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

// routes which should handle requests
app.use('/products', require('./api/routes/product'))
app.use('/orders', require('./api/routes/orders'))


// catch errors to not defined routes
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// catch all errors throwed in the app
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
