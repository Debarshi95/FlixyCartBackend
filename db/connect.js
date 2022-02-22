const { connect } = require('mongoose');

const { MONGO_URI: uri } = require('../utils/config');

module.exports = async () => {
  try {
    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
};
