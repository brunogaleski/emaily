const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

// Google passport configs
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleID: profile.id})
      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({ googleID: profile.id, facebookID: null, emails: profile.emails }).save()
      done(null, user)
    }
  )
)

// Facebook passport configs
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'political'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({facebookID: profile.id})
      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({ googleID: null, facebookID: profile.id, emails: profile.emails }).save()
      done(null, user)
    }
  )
)
