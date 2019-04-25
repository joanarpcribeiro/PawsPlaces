module.exports = {
  // When the user is connected, we go to the next middleware
  // Otherwise, the user is redirected to the login page

  checkAdmin: (req,res,next) => {
    if(req.user && req.user.role === "ADMIN") next()
    else res.redirect ('/auth/sign-in')
  }
} 