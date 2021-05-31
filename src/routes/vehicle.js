const express = require('express');
const app = express.Router();
const parseData = require('../middleware/cvsParser');
const multer = require('multer');

const vehicleController = require('../controllers/vehicle');

const upload = multer();

app.post('/', upload.single('file'), parseData, async (req, res) => {
  const result = await vehicleController.createVehicles(req.body);
  if (!result.error) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      title: 'Error on creating new vehicles from csv file!',
      message: result.error,
    });
  }
});

module.exports = app;
