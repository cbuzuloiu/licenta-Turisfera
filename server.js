/* eslint-disable */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.log(`UNCOUGHT EXCEPTION! Shuting down ...`);
//   console.log(err.name, err.message);
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// CONNECTING THE DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`db connection sussesful`);
  });

// STARTING UP THE SERVER
const port = process.env.PORT;

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`UNHANDLED REJECTION! Shuting down ...`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
