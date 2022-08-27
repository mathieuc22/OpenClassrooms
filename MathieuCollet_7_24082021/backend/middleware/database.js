const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// module.exports = new Sequelize('sqlite::memory:', {
//   // Displays the first parameter of the log function call
//   logging: console.log,
// });

module.exports = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST
});