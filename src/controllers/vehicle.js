const Vehicle = require('../models/vehicle');

const createVehicles = async ({ userName, vehicles }) => {
  const newVehicles = vehicles.map((vehicle) => {
    return new Vehicle({
      uuid: vehicle.uuid,
      vind: vehicle.vind,
      make: vehicle.make,
      model: vehicle.model,
      mileage: vehicle.mileage,
      year: vehicle.year,
      price: vehicle.price,
      zipCode: vehicle.zipCode,
      createDate: vehicle.createDate,
      updateDate: vehicle.updateDate,
      userName: userName,
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
