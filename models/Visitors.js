const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  passenger: String,
  carPlateNumber: String,
  time: String,
});

module.exports = mongoose.model('Drivers', driverSchema);
