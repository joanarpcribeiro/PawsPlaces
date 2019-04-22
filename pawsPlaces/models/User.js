const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    match: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  },
  password: {
    type: String,
    match: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
  },
  name: String,
  location: {
    type: String,
    required: false
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
    default: "imagemACriar",

  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
