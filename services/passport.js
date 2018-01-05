const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

// Google passport configs
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleID: profile.id})
      .then((existingUser) => {
        if (existingUser) {
          // User already exists
          done(null, existingUser)
        } else {
          new User({ googleID: profile.id, facebookID: null, emails: profile.emails })
            .save()
            .then(user => done(null, user))
        }
      })
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
      profileFields: ['id', 'displayName', 'email', 'political']
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({facebookID: profile.id})
        .then((existingUser) => {
          if (existingUser) {
            // User already exists
            done(null, existingUser)
          } else {
            new User({ googleID: null, facebookID: profile.id, emails: profile.emails })
              .save()
              .then(user => done(null, user))
          }
        })
    }
  )
)
