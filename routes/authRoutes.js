const passport = require('passport')

module.exports = (app) => {
 // Google Auth Routes
  app.get(
   '/auth/google/',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  app.get('/auth/google/callback', passport.authenticate('google'))

  // Facebook Auth Routes
  app.get(
    '/auth/facebook/',
    passport.authenticate('facebook', {
      scope: ['user_friends', 'email']
    })
  )
  app.get('/auth/facebook/callback', passport.authenticate('facebook'))

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
