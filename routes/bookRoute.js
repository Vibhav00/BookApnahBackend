const express = require('express')
const { getAllBooks } = require('./../controllers/bookController')
const router = express.Router()
router.route('/').get(getAllBooks)
module.exports = router
