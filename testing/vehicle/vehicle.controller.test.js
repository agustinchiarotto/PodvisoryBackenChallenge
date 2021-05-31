const Vehicle = require('../../src/models/vehicle');
const VehicleControler = require('../../src/controllers/vehicle');
const DBManager = require('./dbManager');
const dbman = new DBManager();
const mockVehicles = require('./mockData/vehiclesData.json');

const postVehiclesData = {
  userName: 'user1',
  vehicles: [
    {
      uuid: '1',
      vind: '1',
      make: '1',
      model: '1',
      mileage: '1',
      year: '1',
      price: 1,
      zipCode: '1',
      createDate: '2016-05-19T16:00:00Z',
      updateDate: '2016-05-19T16:00:00Z',
    },
    {
      uuid: '2',
      vind: '2',
      make: '2',
      model: '2',
      mileage: '2',
      year: '2',
      price: 2,
      zipCode: '2',
      createDate: '2016-05-19T16:00:00Z',
      updateDate: '2016-05-19T16:00:00Z',
    },
  ],
};

beforeAll(async () => {
  await dbman.start();
});

afterAll(async () => {
  await dbman.stop();
});

describe('Post Vehicle - /vehicle', () => {
  it('should post vehicles correctly', async () => {
    await insertMockVehicles();
    const result = await VehicleControler.createVehicles(postVehiclesData);
    expect(result[0].userName).toBe(postVehiclesData.userName);
  });

  it('should return an error on posting a vehicle (duplicated uuid)', async () => {
    const result = await VehicleControler.createVehicles(postVehiclesData);
    expect(result.message).toBe('E11000 duplicate key error dup key: { : "1" }');
  });
});

async function insertMockVehicles() {
  await Vehicle.insertMany(mockVehicles);
}
