const express = require('express')
const {
  registerUser,
  loginUser,
  logout,
  addToCart,
  checkcorrectuser,
  getAllCart,
  deleteCartItem,
  updatePassword,
  updateProfile,
  getUserDetails,
} = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middlewares/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

router.route('/logout').get(logout)
router.route('/check').get(isAuthenticatedUser, checkcorrectuser)
router.route('/addtocart').post(isAuthenticatedUser, addToCart)
router.route('/getAllCart').get(isAuthenticatedUser, getAllCart)
router.route('/deletereview').delete(isAuthenticatedUser, deleteCartItem)
router.route('/updatepassword').put(isAuthenticatedUser, updatePassword)
router.route('/updateProfile').put(isAuthenticatedUser, updateProfile)
router.route('/userdetails').get(isAuthenticatedUser, getUserDetails)

module.exports = router
