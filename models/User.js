const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleID: String,
  facebookID: String,
  emails: Array,
  credits: {
    type: Number,
    default: 0
  }
})

mongoose.model('users', userSchema)
