const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    description: String,
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  
  module.exports = mongoose.model('Review', ReviewSchema);