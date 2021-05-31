const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehicleSchema = Schema({
  uuid: { type: String, unique: true },
  vind: { type: String, unique: true },
  make: String,
  model: String,
  mileage: String,
  year: String,
  price: Number,
  zipCode: String,
  createDate: Date,
  updateDate: Date,
  userName: String,
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
