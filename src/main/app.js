import path from 'path'
import morgan from 'morgan'
import config from 'config'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import createError from 'http-errors'

const app = express()

const router = require('./router')

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

/**
 * view -> app.use(bodyParser.urlencoded({ extended: false }))
 * json -> app.use(bodyParser.json())
 */

/**
 * view:
 * app.set('views', path.join(__dirname, 'views'))
 * app.set('view engine', 'pug')
 * app.use(express.static(path.join(__dirname, 'public')))
 */

/**
 * routes
 */
app.use(router)


/**
 * error handler
 */
app.use((req, res, next) => {
        /**
         * view :
         * let params = {error: createError(404)}
         * res.render('error', params)
         * json -> res.status(404).json(createError(404))
         */
});

app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
                /**
                 * view :
                 * let params = {error: createError(401)}
                 * res.render('error', params)
                 * json -> res.status(401).json({message: 'invalid token!'})
                 */
        }
        /**
         * view :
         * let params = {error: createError(500)}
         * res.render('error', params)
         * json -> res.status(500).json({message: 'server error :c'})
         */
});


/**
 * express server
 */
const port = config.get('express.port')
app.listen(port, () => {
        console.log(`Express server listen in http://localhost:${port}/`)
})

module.exports = app;
