const Vehicle = require('../models/vehicle');

const createVehicles = async ({ providerName, vehicles }) => {
  const newVehicles = vehicles.map((vehicle) => {
    return new Vehicle({
      uuid: vehicle.uuid,
      vin: vehicle.vin,
      make: vehicle.make,
      model: vehicle.model,
      mileage: vehicle.mileage,
      year: vehicle.year,
      price: vehicle.price,
      zipCode: vehicle.zipCode,
      createDate: vehicle.createDate,
      updateDate: vehicle.updateDate,
      providerName: providerName,
    });
  });

  return Vehicle.insertMany(newVehicles)
    .then((result) => result)
    .catch((e) => {
      return { message: e.result.result.writeErrors[0].err.errmsg };
    });
};

module.exports = {
  createVehicles,
};
