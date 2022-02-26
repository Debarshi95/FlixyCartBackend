/* eslint-disable no-await-in-loop */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const util = require('util');
const path = require('path');
const { models } = require('mongoose');

const readDir = util.promisify(fs.readdir);
require('../models/Book');

const toCapitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const seedDatabase = async () => {
  try {
    const dir = await readDir(__dirname);
    const seedFiles = dir.filter((file) => file.endsWith('.seed.json'));

    // eslint-disable-next-line no-restricted-syntax
    for (const file of seedFiles) {
      const fileName = file.split('.seed.json')[0];
      const modelName = toCapitalize(fileName);
      const model = models[modelName];
      if (!model) {
        throw Error(`Cannot find model ${modelName}`);
      }
      const fileContents = require(path.join(__dirname, file));
      await model.insertMany(fileContents);
    }
  } catch (error) {
    console.error('Some error occured', error);
    process.exit(1);
  }
};
module.exports = { seedDatabase };
