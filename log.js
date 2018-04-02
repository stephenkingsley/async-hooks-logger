const fs = require('fs');
const ENV = process.env;

const logger = str => {
  if (ENV !== 'production') {
    fs.writeSync(1, `${str} \n`);
  }
};

module.exports = logger;