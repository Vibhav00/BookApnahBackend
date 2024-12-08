/** importing express js **/
const express = require('express')

/** importing error handlers **/
const ErrorHandler = require('./middlewares/error')

/** importing cors for cross orgin request **/
const cors = require('cors')

/** importing body parser for parsing 'form-body' for image **/
const bodyParser = require('body-parser')

/** creating express app **/
const app = express()
app.use(cors())
const cookieParser = require('cookie-parser')

/**  importing book route **/
const bookRoute = require('./routes/bookRoute')
/**  importing user route  **/
const userRoute = require('./routes/userRoute')

/**  adding middlewares  **/
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/** adding routes **/
app.use('/books', bookRoute)
app.use('/users', userRoute)
// Middleware for Errors
app.use(ErrorHandler)
module.exports = app
