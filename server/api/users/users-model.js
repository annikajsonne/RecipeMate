const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', UserSchema);