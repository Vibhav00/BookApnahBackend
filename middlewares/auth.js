const ErrorHander = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


/** doing aythentication in both way either by 'query param or by cookies '**/
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // getting the token from the query param
  let { token } = req.query

  // getting the token from cookies
  if (token == undefined || token == null) {
    token = req.cookies.token
  }


  if (!token) {
    return next(new ErrorHander('Please Login to access this resource', 401))
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodedData.id)

  next()
})


/** funnction for the authorizing the roles **/
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      )
    }

    next()
  }
}
