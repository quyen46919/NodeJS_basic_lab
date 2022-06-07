const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    min: 4,
    max: 50,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    min: 0,
    max: 128,
    required: true,
  },
  fullName: {
    type: String,
    min: 4,
    max: 50,
    required: true,
  },
  avatar: {
    type: Number,
    min: 0,
    max: 100,
    default: 'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png'
  },
  role: {
    type: Number,
    enum: [1, 2],
    default: 1
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

