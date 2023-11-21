const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true, minlength: 10 },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true },
});

module.exports = mongoose.model('User', userSchema);
