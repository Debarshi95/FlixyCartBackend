const connectToDB = require('./db/connect');
const { PORT } = require('./utils/config');

const app = require('./app');

connectToDB();
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
