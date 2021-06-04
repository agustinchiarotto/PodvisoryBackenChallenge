const csv = require('csv-parser');
const { Readable } = require('stream');
const providerConfigs = require('../../providerConfigs');

const results = [];

const parseData = (req, res, next) => {
  results.splice(0, results.length);

  const providerConfig = providerConfigs.providers.find(
    (config) => config.providerName === req.body.providerName,
  );
  if (providerConfig) {
    Readable.from(req.file.buffer.toString())
      .pipe(csv({ mapHeaders: ({ header, index }) => providerConfig.columnMap[index] }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        req.body.vehicles = results;
        next();
      });
  } else {
    return res.status(404).json({
      title: 'Error!',
      message: `Provider ${req.body.providerName} not found`,
    });
  }
};

(module.exports = parseData), results;
