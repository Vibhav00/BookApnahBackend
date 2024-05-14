const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken()

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  // console.log('token send 😀')

  // sending token in the body as well as cookies
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  })
}

module.exports = sendToken
