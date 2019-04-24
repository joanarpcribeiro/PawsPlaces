const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    // match: "/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i"
  },
  password: String,
  name: String,
  lastName: String,
  location: {
    type: String,
    required: false,
    default: "Lisbon",
  },
  description: String,
  role:{
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  picture: {
    type: String,
    default: "/images/P/defaultProfile.jpeg",
  },
  pet: String,
  numbPet: String,
  aboutPet: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
