const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const connectToDB = require('./db/connect');
const { PORT } = require('./utils/config');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ urlencoded: true, extended: true }));
app.use(
  '/images',
  express.static(path.join(__dirname, '/public/assets/images')),
);

connectToDB();
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
