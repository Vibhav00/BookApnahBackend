const express = require('express')
const ErrorHandler = require('./middlewares/error')
const cors = require('cors')
const app = express()
app.use(cors())
const cookieParser = require('cookie-parser')
const bookRoute = require('./routes/bookRoute')
const userRoute = require('./routes/userRoute')

app.use(express.json())
app.use(cookieParser())
app.use('/books', bookRoute)
app.use('/users', userRoute)

// Middleware for Errors
app.use(ErrorHandler)
module.exports = app
