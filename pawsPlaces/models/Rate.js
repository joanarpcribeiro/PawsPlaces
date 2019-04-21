const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rateSchema = new Schema({
  name: String,
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model('Rate', rateSchema);
module.exports = Rate;