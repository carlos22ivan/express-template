const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('config')
const createError = require('http-errors')
const router = require('./router')
const app = express()

/**
 * mongodb database
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('mongodb.url'))
        .then(() => console.log('Mongoose connection open to ' + config.get('mongodb.url')))
        .catch(err => console.log('Mongoose connection error: ' + err))


/**
 * middleware
 */
app.use(morgan('dev'))

// if views
// /**
//  * views
//  */
// folder public/, views/
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')
// app.use(express.static(path.join(__dirname, 'public')))

/**
 * routes
 */
app.use(router)


/**
 * error handler
 */
app.use((req, res, next) => {
        // if views
        // let params = {error: createError(404)}
        // res.render('error', params)
        // if rest
        // res.status(404).json(createError(404))
});

/**
 * express server
 */
app.listen(config.get('express.port'), () => {
        console.log(`Express server listen in http://localhost:${port}/`)
})

module.exports = app;
