const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// TODO: Secure password with bcrypt
const Admin = model('Admin', adminSchema);
module.exports = Admin;