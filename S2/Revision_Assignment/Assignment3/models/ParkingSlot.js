const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  slotNumber: Number,
  carNumber: String,
  isOccupied: Boolean,
});

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);
