const express = require('express');
const bodyParser = require('body-parser');
const vehicleRoutes = require('./src/routes/vehicle');
require('./database');
const { environment, api_hostname, api_port } = require('./config');

/**
 * Challenge - Podvisory
 * Agustin Chiarotto
 */

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/vehicles', vehicleRoutes);
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api-docs', (req, res) => {
  res.sendFile(__dirname + '/api.html');
});

app.listen(api_port || 3000, api_hostname, () => {
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log(`* Server running in ${environment} mode at http://${api_hostname}:${api_port}/  *`);
  console.log('* Listening on ', api_port || 3000, '                                           *');
  console.log(`* Documentation: http://${api_hostname}:${api_port}/api-docs                 *`);
  console.log(`* Upload a file to test this server: http://${api_hostname}:${api_port}/     *`);
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *');
});
