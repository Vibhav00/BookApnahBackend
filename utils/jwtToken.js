const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken()

  console.log('token send 😀')
  res.status(statusCode).json({
    success: true,
    user,
    token,
  })
}

module.exports = sendToken
