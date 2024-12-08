const ErrorHander = require('./../utils/errorHandler')
const catchAsyncErrors = require('./../middlewares/catchAsyncErrors')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const crypto = require('crypto')
const { log } = require('console')

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body)
  const { name, email, password, username } = req.body

  const user = await User.create({
    name,
    email,
    password,
    username,
  })

  sendToken(user, 201, res)
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body

  // checking if user has given password and email both

  if (!username || !password) {
    return next(new ErrorHander('Please Enter Email & Password', 400))
  }

  const user = await User.findOne({ username }).select('+password')

  if (!user) {
    return next(new ErrorHander('Invalid email or password', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHander('Invalid email or password', 401))
  }

  res.set('Access-Control-Allow-Origin', req.headers.origin) //req.headers.origin
  res.set('Access-Control-Allow-Credentials', 'true')
  // access-control-expose-headers allows JS in the browser to see headers other than the default 7
  res.set(
    'Access-Control-Expose-Headers',
    'date, etag, access-control-allow-origin, access-control-allow-credentials'
  )
  sendToken(user, 200, res)
})

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  })
})

// add to cart ***************
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { name, price, author, image, printing } = req.body

  const cartEle = {
    name,
    price,
    author,
    image,
    printing,
  }
  const user = await User.findById(req.user.id)
  user.cart.push(cartEle)

  await user.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
  })
})

// check if the user is authenticated to open cart page
exports.checkcorrectuser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
  })
})

//** get all cart elements  */
exports.getAllCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    cartItems: user.cart,
  })
})

//  delete a cart item //
exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {
  // const name = req.body.name
  let { name } = req.query
  const user = await User.findById(req.user.id)

  console.log(name)
  const cartItems = user.cart.filter((cart) => cart.name != name)

  console.log(req.user.id)
  console.log(cartItems)

  await User.findByIdAndUpdate(
    req.user.id,
    {
      cart: cartItems,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  res.status(200).json({
    success: true,
  })
})

exports.checkcorrectuser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
  })
})

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  console.log('here', req.body)
  const user = await User.findById(req.user.id).select('+password')

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHander('Old password is incorrect', 400))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander('password does not match', 400))
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)
})

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    message: 'user updated successfully',
  })
})

//  get user details ...

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    user,
  })
})
