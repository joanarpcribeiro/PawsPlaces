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
  location: {
    type: String,
    required: false,
    default: "Lisbon",
  },
  description: String,
  role:{
    type: String,
    enum: ['NOT_REGISTER', 'ADMIN', 'LOGED_IN'],
    default: 'LOGED_IN'
    // mais tarde podemos adicionar ADMIN
  },
  picture: {
    type: String,
    default: "/images/P/defaultProfile.jpeg",
  },
  Pet: String,
  About_pet: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
