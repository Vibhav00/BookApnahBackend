const express = require('express')
const {
  getAllBooks,
  addBook,
  initializeBooks,
  deleteBook,
  getBookDetails,
  updateBook,
} = require('./../controllers/bookController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const router = express.Router()
router.route('/').get(getAllBooks)
router.route('/init').get(initializeBooks)
router
  .route('/book/:id')
  .post(isAuthenticatedUser, authorizeRoles('admin'), addBook)
  .get(getBookDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBook)

module.exports = router
