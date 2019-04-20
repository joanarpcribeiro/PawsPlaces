const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 4
  },
  address: {
    type: String,
    required: true,
    min: 4
  },
  postCode: String,
  neighbourhood: String,
  pictureUrl: String,
  contactNumb: Number,
  websiteURL: String,
  category: String,
  warning: String

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;