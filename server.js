const app = require('./app')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

const connectDatabase = require('./config/database')
connectDatabase()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://127.0.0.1:${process.env.PORT}`)
})
