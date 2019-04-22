module.exports = {
  answer: 42,
  // When the user is connected, we go to the next middleware
  // Otherwise, the user is redirected to the login page
  checkConnected: (req,res,next) => {
    // req.user contains the informations about the connected user (undefined if not connected)
    if (req.user) next()
    else res.redirect('/sign-in')
  },
  checkAdmin: (req,res,next) => {
    if(req.user && req.user.role === "ADMIN")
    next()
    else res.redirect ('/paws/sign-in')
  }
  
  // Function that returns a middleware
  // checkRole: (role) => {
  //   return (req,res,next) => {
  //     if (req.user && req.user.role === role) next()
  //     else res.redirect('/sign-in')
  //   }
  // }
} 