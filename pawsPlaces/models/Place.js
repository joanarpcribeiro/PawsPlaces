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
  description: String,
  neighbourhood: String,
  pictureURL: String,
  contactNumb: Number,
  websiteURL: String,
  category: {
    type: String,
    enum: ["Restaurant", "Accomodation", "Garden", "Dog grooming", "Public Transportation", "Veterinarian", "Pet shop", "Hospital", "Shopping"]
  },
  group: {
    type: String,
    enum: ["Hotel", "Guesthouse", "Apartment", "Hostel", "Train", "Metro, bus and tramway", "Express Bus", "Boat", "Bus"]
  },
  warning: String

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;