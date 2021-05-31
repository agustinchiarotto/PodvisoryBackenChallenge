const csv = require('csv-parser');
const { Readable } = require('stream');
const results = [];

const parseData = (req, res, next) => {
  results.splice(0, results.length);
  Readable.from(req.file.buffer.toString())
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      req.body.vehicles = results;
      next();
    });
  return res;
};

(module.exports = parseData), results;
